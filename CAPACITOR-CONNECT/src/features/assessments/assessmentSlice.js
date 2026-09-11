import { createSlice } from "@reduxjs/toolkit";

const demoAssessments = [
  {
    id: 701,
    title: "Weather Forecasting Fundamentals",
    course: "Fundamentals of Weather Forecasting",
    status: "Active",
    type: "Questionnaire",
    deadline: "2026-09-20",
    duration: "30 minutes",
    participants: 72,
    completed: 58,
    questions: [
      { id: 1, text: "Which factor most directly influences local weather?", type: "Multiple choice", points: 2, options: ["Atmospheric pressure", "Soil colour", "Latitude only", "Ocean depth"] },
      { id: 2, text: "Describe how pressure systems affect wind direction.", type: "Written response", points: 5, options: [] },
    ],
  },
  {
    id: 702,
    title: "Climate Data Analysis Assessment",
    course: "Climate Data Analysis",
    status: "Active",
    type: "Questionnaire",
    deadline: "2026-09-18",
    duration: "45 minutes",
    participants: 82,
    completed: 69,
    questions: [
      { id: 3, text: "Which Python library is commonly used for tabular climate data?", type: "Multiple choice", points: 2, options: ["pandas", "pygame", "flask", "turtle"] },
      { id: 4, text: "Explain one way to handle missing observations in a dataset.", type: "Written response", points: 5, options: [] },
    ],
  },
  {
    id: 703,
    title: "React Fundamentals Assessment",
    course: "Modern Web Development",
    status: "Draft",
    type: "Questionnaire",
    deadline: "2026-09-22",
    duration: "35 minutes",
    participants: 0,
    completed: 0,
    questions: [
      { id: 5, text: "Which hook is used to manage state in a function component?", type: "Multiple choice", points: 2, options: ["useState", "useRoute", "useClass", "useMarkup"] },
      { id: 6, text: "What is the purpose of a React key in a list?", type: "Written response", points: 4, options: [] },
    ],
  },
];

const demoResults = [
  { id: 801, assessmentId: 701, trainee: "Aarav Sharma", score: 91, status: "Passed", submittedAt: "2026-09-06" },
  { id: 802, assessmentId: 701, trainee: "Meera Nair", score: 98, status: "Passed", submittedAt: "2026-09-08" },
  { id: 803, assessmentId: 702, trainee: "Priya Verma", score: 96, status: "Passed", submittedAt: "2026-09-07" },
  { id: 804, assessmentId: 702, trainee: "Rohan Singh", score: 74, status: "Passed", submittedAt: "2026-09-05" },
];

const assessmentSlice = createSlice({
  name: "assessments",
  initialState: { assessments: demoAssessments, results: demoResults },
  reducers: {
    addAssessment(state, action) { state.assessments.push(action.payload); },
    updateAssessment(state, action) {
      const item = state.assessments.find((assessment) => assessment.id === action.payload.id);
      if (item) Object.assign(item, action.payload);
    },
    addResult(state, action) {
      state.results.push(action.payload);
    },
    removeAssessment(state, action) { state.assessments = state.assessments.filter((assessment) => assessment.id !== action.payload); },
  },
});

export const { addAssessment, updateAssessment, addResult, removeAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
