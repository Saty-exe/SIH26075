export const formatChatTime = (value) =>
  new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

export const formatChatDay = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const chatInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function groupMessagesByDay(messages) {
  return messages.reduce((groups, message) => {
    const day = formatChatDay(message.sentAt);
    const last = groups[groups.length - 1];
    if (last && last.day === day) {
      last.messages.push(message);
      return groups;
    }
    groups.push({ day, messages: [message] });
    return groups;
  }, []);
}
