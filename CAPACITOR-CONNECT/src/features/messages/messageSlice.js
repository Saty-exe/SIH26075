import { createSlice } from "@reduxjs/toolkit";

export const TRAINER = "trainer";
export const TRAINEE = "trainee";

export const buildConversationId = (trainerId, traineeId) =>
  `CHAT-${trainerId}-${traineeId}`;

const initialState = {
  conversations: [
    {
      id: buildConversationId(203, 1),
      trainerId: 203,
      traineeId: 1,
      courseId: 501,
      messages: [
        {
          id: "MSG-1001",
          author: TRAINEE,
          text: "Hello sir, I am stuck on the API integration module of Modern Web Development.",
          sentAt: "2026-09-09T04:12:00.000Z",
          read: true,
        },
        {
          id: "MSG-1002",
          author: TRAINER,
          text: "Happy to help. Share the error you are seeing and the endpoint you are calling.",
          sentAt: "2026-09-09T05:02:00.000Z",
          read: true,
        },
        {
          id: "MSG-1003",
          author: TRAINEE,
          text: "The request returns 401 even though I pass the token in headers.",
          sentAt: "2026-09-09T05:26:00.000Z",
          read: false,
        },
      ],
    },
  ],
};

function findConversation(state, trainerId, traineeId) {
  return state.conversations.find(
    (conversation) =>
      Number(conversation.trainerId) === Number(trainerId) &&
      Number(conversation.traineeId) === Number(traineeId),
  );
}

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    startConversation(state, action) {
      const { trainerId, traineeId, courseId } = action.payload;
      if (findConversation(state, trainerId, traineeId)) return;
      state.conversations.push({
        id: buildConversationId(trainerId, traineeId),
        trainerId,
        traineeId,
        courseId,
        messages: [],
      });
    },
    sendMessage(state, action) {
      const { trainerId, traineeId, courseId, author, text } = action.payload;
      const body = text.trim();
      if (!body) return;

      let conversation = findConversation(state, trainerId, traineeId);
      if (!conversation) {
        conversation = {
          id: buildConversationId(trainerId, traineeId),
          trainerId,
          traineeId,
          courseId,
          messages: [],
        };
        state.conversations.push(conversation);
      }

      conversation.messages.push({
        id: `MSG-${Date.now()}-${conversation.messages.length + 1}`,
        author,
        text: body,
        sentAt: new Date().toISOString(),
        read: false,
      });
    },
    markConversationRead(state, action) {
      const { trainerId, traineeId, reader } = action.payload;
      const conversation = findConversation(state, trainerId, traineeId);
      if (!conversation) return;
      conversation.messages.forEach((message) => {
        if (message.author !== reader) message.read = true;
      });
    },
  },
});

export const { startConversation, sendMessage, markConversationRead } =
  messageSlice.actions;
export default messageSlice.reducer;
