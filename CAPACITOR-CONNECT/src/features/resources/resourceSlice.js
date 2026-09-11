import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resources: [
    { id: "RES-1001", trainerId: 203, courseId: 501, title: "React component patterns", type: "Recorded Lectures", url: "#", uploadedAt: "2026-09-04", status: "Published" },
    { id: "RES-1002", trainerId: 203, courseId: 501, title: "Frontend architecture slides", type: "Presentations", url: "#", uploadedAt: "2026-09-02", status: "Published" },
  ],
};

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    addResource(state, action) { state.resources.unshift(action.payload); },
    updateResource(state, action) { const resource = state.resources.find((item) => item.id === action.payload.id); if (resource) Object.assign(resource, action.payload); },
    removeResource(state, action) { state.resources = state.resources.filter((item) => item.id !== action.payload); },
  },
});

export const { addResource, updateResource, removeResource } = resourceSlice.actions;
export default resourceSlice.reducer;
