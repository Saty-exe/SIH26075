import { TRAINEE, TRAINER } from "./messageSlice";

const EMPTY_MESSAGES = [];

export function selectConversations(state) {
  return state.messageReducer.conversations;
}

export function findConversation(conversations, trainerId, traineeId) {
  return conversations.find(
    (conversation) =>
      Number(conversation.trainerId) === Number(trainerId) &&
      Number(conversation.traineeId) === Number(traineeId),
  );
}

export function getMessages(conversations, trainerId, traineeId) {
  return (
    findConversation(conversations, trainerId, traineeId)?.messages ||
    EMPTY_MESSAGES
  );
}

export function getLastMessage(conversations, trainerId, traineeId) {
  const messages = getMessages(conversations, trainerId, traineeId);
  return messages[messages.length - 1] || null;
}

export function countUnread(conversations, trainerId, traineeId, reader) {
  return getMessages(conversations, trainerId, traineeId).filter(
    (message) => message.author !== reader && !message.read,
  ).length;
}

export function selectTrainerUnreadTotal(state, trainerId) {
  return selectConversations(state)
    .filter((conversation) => Number(conversation.trainerId) === Number(trainerId))
    .reduce(
      (total, conversation) =>
        total +
        conversation.messages.filter(
          (message) => message.author === TRAINEE && !message.read,
        ).length,
      0,
    );
}

export function selectTraineeUnreadTotal(state, traineeId) {
  return selectConversations(state)
    .filter((conversation) => Number(conversation.traineeId) === Number(traineeId))
    .reduce(
      (total, conversation) =>
        total +
        conversation.messages.filter(
          (message) => message.author === TRAINER && !message.read,
        ).length,
      0,
    );
}
