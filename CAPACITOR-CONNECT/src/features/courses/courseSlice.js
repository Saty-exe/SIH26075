import { createSlice } from "@reduxjs/toolkit";

const demoCourses = [
  {
    id: 501,
    title: "Modern Web Development",
    category: "Software Development",
    level: "Intermediate",
    status: "Published",
    instructor: "Amit Verma",
    duration: "8 weeks",
    enrolledTrainees: 112,
    completionRate: 69,
    description: "Build production-ready web applications with modern JavaScript, React, and API design.",
  },
  {
    id: 502,
    title: "Climate Data Analysis",
    category: "Data Science",
    level: "Advanced",
    status: "Published",
    instructor: "Dr. Priya Nair",
    duration: "6 weeks",
    enrolledTrainees: 94,
    completionRate: 81,
    description: "Explore climate datasets with Python, statistics, visualization, and reproducible analysis.",
  },
  {
    id: 503,
    title: "Fundamentals of Weather Forecasting",
    category: "Meteorology",
    level: "Beginner",
    status: "Published",
    instructor: "Dr. Rajiv Mehta",
    duration: "5 weeks",
    enrolledTrainees: 86,
    completionRate: 78,
    description: "Learn the principles, tools, and decision-making techniques behind weather forecasting.",
  },
  {
    id: 504,
    title: "IoT and Environmental Sensors",
    category: "Internet of Things",
    level: "Intermediate",
    status: "Draft",
    instructor: "Ankit Malhotra",
    duration: "7 weeks",
    enrolledTrainees: 0,
    completionRate: 0,
    description: "Design sensor-based monitoring systems for environmental and field applications.",
  },
  {
    id: 505,
    title: "Data Analytics Fundamentals",
    category: "Data Science",
    level: "Beginner",
    status: "Archived",
    instructor: "Vivek Joshi",
    duration: "4 weeks",
    enrolledTrainees: 79,
    completionRate: 71,
    description: "Develop practical skills in data preparation, dashboards, and evidence-based decisions.",
  },
];

const initialState = { courses: demoCourses };

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter((course) => course.id !== action.payload);
    },
    updateCourse(state, action) {
      const course = state.courses.find((item) => item.id === action.payload.id);
      if (course) Object.assign(course, action.payload);
    },
    enrollTrainee(state, action) {
      const course = state.courses.find((item) => item.id === action.payload.courseId);
      if (course) course.enrolledTrainees += 1;
    },
    publishCourse(state, action) {
      const course = state.courses.find((item) => item.id === action.payload.id);
      if (course) course.status = action.payload.status;
    },
  },
});

export const { addCourse, removeCourse, updateCourse, enrollTrainee, publishCourse } = courseSlice.actions;
export default courseSlice.reducer;
