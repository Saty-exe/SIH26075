import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { formatChatTime, groupMessagesByDay } from "./chatFormatters";

export default function ChatThread({
  variant,
  contact,
  messages,
  viewer,
  onSend,
  placeholder = "Write a message...",
  emptyTitle = "Select a conversation to start chatting",
}) {
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);
  const groups = useMemo(() => groupMessagesByDay(messages), [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, contact?.id]);

  useEffect(() => {
    setDraft("");
  }, [contact?.id]);

  if (!contact) {
    return (
      <section className={`chat-thread chat-thread-${variant} chat-thread-empty`}>
        <MessageSquare size={24} />
        <strong>{emptyTitle}</strong>
      </section>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onSend(draft);
    setDraft("");
  };

  return (
    <section className={`chat-thread chat-thread-${variant}`}>
      <header className="chat-thread-header">
        <span className="chat-thread-avatar">{contact.initials}</span>
        <div>
          <strong>{contact.name}</strong>
          <span>{contact.subtitle}</span>
        </div>
      </header>

      <div className="chat-messages" role="log" aria-live="polite">
        {groups.map((group) => (
          <div className="chat-day-group" key={group.day}>
            <span className="chat-day-label">{group.day}</span>
            {group.messages.map((message) => (
              <article
                key={message.id}
                className={`chat-bubble${message.author === viewer ? " chat-bubble-own" : ""}`}
              >
                <p>{message.text}</p>
                <time dateTime={message.sentAt}>
                  {formatChatTime(message.sentAt)}
                </time>
              </article>
            ))}
          </div>
        ))}
        {!messages.length && (
          <p className="chat-empty-note">
            No messages yet. Say hello to {contact.name.split(" ")[0]}.
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form className="chat-composer" onSubmit={submit}>
        <label className="chat-composer-field">
          <span className="chat-visually-hidden">Message {contact.name}</span>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) submit(event);
            }}
            placeholder={placeholder}
            rows={1}
          />
        </label>
        <button type="submit" disabled={!draft.trim()} aria-label="Send message">
          <SendHorizontal size={16} />
        </button>
      </form>
    </section>
  );
}
