import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ChatContactList from "../../components/Chat/ChatContactList";
import ChatThread from "../../components/Chat/ChatThread";
import { chatInitials } from "../../components/Chat/chatFormatters";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";
import {
  countUnread,
  getLastMessage,
  getMessages,
  selectConversations,
} from "../../features/messages/messageSelectors";
import {
  TRAINER,
  markConversationRead,
  sendMessage,
} from "../../features/messages/messageSlice";
import useTrainerData from "./hooks/useTrainerData";

export default function TrainerMessages() {
  const { trainer, trainees, courses } = useTrainerData();
  const conversations = useSelector(selectConversations);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const contacts = useMemo(
    () =>
      trainees.map((trainee) => {
        const lastMessage = getLastMessage(conversations, trainer.id, trainee.id);
        const enrollment = trainee.learning.enrolledCourses.find((item) =>
          courses.some(
            (course) =>
              course.id === item.courseId || course.title === item.title,
          ),
        );
        return {
          id: trainee.id,
          name: trainee.name,
          initials: chatInitials(trainee.name),
          subtitle: enrollment?.title || "Capacity Connect learner",
          lastMessage: lastMessage?.text,
          lastAt: lastMessage?.sentAt,
          unread: countUnread(conversations, trainer.id, trainee.id, TRAINER),
        };
      }),
    [conversations, courses, trainees, trainer.id],
  );

  const visibleContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [contacts, query],
  );

  const requestedId = Number(searchParams.get("trainee")) || null;
  const activeId =
    contacts.find((contact) => contact.id === requestedId)?.id ||
    visibleContacts[0]?.id ||
    contacts[0]?.id ||
    null;
  const activeContact = contacts.find((contact) => contact.id === activeId) || null;
  const messages = getMessages(conversations, trainer.id, activeId);

  useEffect(() => {
    if (!activeId) return;
    dispatch(
      markConversationRead({
        trainerId: trainer.id,
        traineeId: activeId,
        reader: TRAINER,
      }),
    );
  }, [activeId, dispatch, messages.length, trainer.id]);

  const selectContact = (id) => {
    setSearchParams({ trainee: String(id) }, { replace: true });
  };

  const send = (text) => {
    dispatch(
      sendMessage({
        trainerId: trainer.id,
        traineeId: activeId,
        courseId: courses[0]?.id,
        author: TRAINER,
        text,
      }),
    );
  };

  const unreadTotal = contacts.reduce((total, contact) => total + contact.unread, 0);

  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Direct support"
        title="Messages"
        description="Chat one to one with the learners enrolled in your courses."
        action={
          <span className="trainer-inline-pill">
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </span>
        }
      />
      <div className="chat-layout">
        <ChatContactList
          variant="trainer"
          contacts={visibleContacts}
          activeId={activeId}
          onSelect={selectContact}
          query={query}
          onQueryChange={setQuery}
          searchLabel="Search trainees"
          emptyLabel="No trainees match your search"
        />
        <ChatThread
          variant="trainer"
          contact={activeContact}
          messages={messages}
          viewer={TRAINER}
          onSend={send}
          placeholder="Reply to your trainee..."
          emptyTitle="Select a trainee to start chatting"
        />
      </div>
    </section>
  );
}
