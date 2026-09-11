import { createSlice } from "@reduxjs/toolkit";

const complaintSlice = createSlice({
  name: "complaints",
  initialState: {
    complaints: [
      { id: 901, subject: "Unable to access assessment", category: "Assessment", reporter: "Aarav Sharma", role: "Trainee", priority: "High", status: "Open", createdAt: "2026-09-09", description: "The assessment page returns an access error before submission." },
      { id: 902, subject: "Course completion not updated", category: "Course progress", reporter: "Priya Verma", role: "Trainee", priority: "Medium", status: "In review", createdAt: "2026-09-08", description: "Completed course progress is still showing 94 percent." },
      { id: 903, subject: "Need to update course resources", category: "Course content", reporter: "Amit Verma", role: "Trainer", priority: "Low", status: "Resolved", createdAt: "2026-09-06", description: "Request to replace an outdated reference document." },
      { id: 904, subject: "Certificate name correction", category: "Certification", reporter: "Ananya Gupta", role: "Trainee", priority: "Medium", status: "Open", createdAt: "2026-09-05", description: "The certificate uses an abbreviated name instead of the profile name." },
    ],
  },
  reducers: {
    addComplaint(state, action) { state.complaints.unshift(action.payload); },
    updateComplaintStatus(state, action) {
      const complaint = state.complaints.find((item) => item.id === action.payload.id);
      if (complaint) complaint.status = action.payload.status;
    },
    removeComplaint(state, action) { state.complaints = state.complaints.filter((item) => item.id !== action.payload); },
  },
});

export const { addComplaint, updateComplaintStatus, removeComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;
