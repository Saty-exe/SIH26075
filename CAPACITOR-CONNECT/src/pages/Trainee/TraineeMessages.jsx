import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ChatContactList from "../../components/Chat/ChatContactList";
import ChatThread from "../../components/Chat/ChatThread";
import { chatInitials } from "../../components/Chat/chatFormatters";
import { PageIntro } from "./components/PortalComponents";
import {
  countUnread,
  getLastMessage,
  getMessages,
  selectConversations,
} from "../../features/messages/messageSelectors";
import {
  TRAINEE,
  markConversationRead,
  sendMessage,
} from "../../features/messages/messageSlice";
import useTraineeData from "./hooks/useTraineeData";

export default function TraineeMessages() {
  const { trainee, trainers, enrollments } = useTraineeData();
  const conversations = useSelector(selectConversations);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const contacts = useMemo(() => {
    const enrolledTrainers = enrollments
      .map((item) => item.trainer)
      .filter(Boolean);
    const unique = [...new Map(enrolledTrainers.map((item) => [item.id, item])).values()];
    const source = unique.length ? unique : trainers;

    return source.map((item) => {
      const lastMessage = getLastMessage(conversations, item.id, trainee.id);
      const course = enrollments.find(
        (enrollment) => enrollment.trainer?.id === item.id,
      );
      return {
        id: item.id,
        name: item.name,
        initials: chatInitials(item.name),
        subtitle: course?.course.title || item.profile?.designation || "Trainer",
        lastMessage: lastMessage?.text,
        lastAt: lastMessage?.sentAt,
        unread: countUnread(conversations, item.id, trainee.id, TRAINEE),
      };
    });
  }, [conversations, enrollments, trainee.id, trainers]);

  const visibleContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [contacts, query],
  );

  const requestedId = Number(searchParams.get("trainer")) || null;
  const activeId =
    contacts.find((contact) => contact.id === requestedId)?.id ||
    visibleContacts[0]?.id ||
    contacts[0]?.id ||
    null;
  const activeContact = contacts.find((contact) => contact.id === activeId) || null;
  const messages = getMessages(conversations, activeId, trainee.id);

  useEffect(() => {
    if (!activeId) return;
    dispatch(
      markConversationRead({
        trainerId: activeId,
        traineeId: trainee.id,
        reader: TRAINEE,
      }),
    );
  }, [activeId, dispatch, messages.length, trainee.id]);

  const send = (text) => {
    dispatch(
      sendMessage({
        trainerId: activeId,
        traineeId: trainee.id,
        courseId: enrollments[0]?.course.id,
        author: TRAINEE,
        text,
      }),
    );
  };

  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Ask for help"
        title="Messages"
        description="Chat directly with the trainers who run your courses."
      />
      <div className="chat-layout">
        <ChatContactList
          variant="trainee"
          contacts={visibleContacts}
          activeId={activeId}
          onSelect={(id) => setSearchParams({ trainer: String(id) }, { replace: true })}
          query={query}
          onQueryChange={setQuery}
          searchLabel="Search trainers"
          emptyLabel="No trainers match your search"
        />
        <ChatThread
          variant="trainee"
          contact={activeContact}
          messages={messages}
          viewer={TRAINEE}
          onSend={send}
          placeholder="Ask your trainer a question..."
          emptyTitle="Select a trainer to start chatting"
        />
      </div>
    </section>
  );
}
