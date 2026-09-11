import { Search } from "lucide-react";
import { formatChatTime } from "./chatFormatters";

export default function ChatContactList({
  variant,
  contacts,
  activeId,
  onSelect,
  query,
  onQueryChange,
  searchLabel = "Search conversations",
  emptyLabel = "No conversations yet",
}) {
  return (
    <aside className={`chat-contacts chat-contacts-${variant}`}>
      <label className="chat-search">
        <Search size={16} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={searchLabel}
          aria-label={searchLabel}
        />
      </label>
      <ul className="chat-contact-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              type="button"
              className={`chat-contact${contact.id === activeId ? " chat-contact-active" : ""}`}
              onClick={() => onSelect(contact.id)}
              aria-current={contact.id === activeId}
            >
              <span className="chat-contact-avatar">{contact.initials}</span>
              <span className="chat-contact-copy">
                <strong>{contact.name}</strong>
                <small>{contact.lastMessage || contact.subtitle}</small>
              </span>
              <span className="chat-contact-meta">
                {contact.lastAt && <time>{formatChatTime(contact.lastAt)}</time>}
                {contact.unread > 0 && (
                  <b aria-label={`${contact.unread} unread messages`}>
                    {contact.unread}
                  </b>
                )}
              </span>
            </button>
          </li>
        ))}
        {!contacts.length && <li className="chat-contacts-empty">{emptyLabel}</li>}
      </ul>
    </aside>
  );
}
