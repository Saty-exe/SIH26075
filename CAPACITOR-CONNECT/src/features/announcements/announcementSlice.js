import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  announcements: [
    { id: "ANN-1001", trainerId: 203, courseId: 501, title: "September assessment window is now open", message: "Review the updated assessment guidance before your next attempt.", target: "course-trainees", publishDate: "2026-09-09", status: "Published" },
  ],
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    addAnnouncement(state, action) { state.announcements.unshift(action.payload); },
    updateAnnouncement(state, action) { const announcement = state.announcements.find((item) => item.id === action.payload.id); if (announcement) Object.assign(announcement, action.payload); },
    removeAnnouncement(state, action) { state.announcements = state.announcements.filter((item) => item.id !== action.payload); },
  },
});

export const { addAnnouncement, updateAnnouncement, removeAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;
