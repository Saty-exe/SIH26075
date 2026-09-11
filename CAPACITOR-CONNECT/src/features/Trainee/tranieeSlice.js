import {createSlice} from "@reduxjs/toolkit"
import trainees from "./traineeData"
const initialState = {
    trainee: trainees
}

export const traineeSlice = createSlice({
    name: "trainee",
    initialState,
    reducers: {
        addTrainee(state,action) {
            state.trainee.push(action.payload)
        },
        removeTrainee(state,action) {
            state.trainee = state.trainee.filter((item)=> item.id !== action.payload.id)

        },
        updateTrainee(state,action) {
            const item = state.trainee.find((p)=> p.id === action.payload.id)

            if (!item) return
            Object.assign(item, action.payload)
            },
            enrollCourse(state, action) {
                const item = state.trainee.find((trainee) => trainee.id === action.payload.traineeId)
                if (!item || item.learning.enrolledCourses.some((course) => course.courseId === action.payload.courseId)) return

                item.learning.enrolledCourses.push({
                    courseId: action.payload.courseId,
                    title: action.payload.title,
                    progress: 0,
                    status: "In Progress",
                })
                item.activity.coursesInProgress += 1
            },
            saveCourse(state, action) {
                const item = state.trainee.find((trainee) => trainee.id === action.payload.traineeId)
                if (!item) return
                item.learning.savedCourses = item.learning.savedCourses || []
                if (!item.learning.savedCourses.includes(action.payload.courseId)) {
                    item.learning.savedCourses.push(action.payload.courseId)
                }
            },
            updateCourseProgress(state, action) {
                const item = state.trainee.find((trainee) => trainee.id === action.payload.traineeId)
                const course = item?.learning.enrolledCourses.find((enrolled) => enrolled.courseId === action.payload.courseId)
                if (!course) return
                course.progress = action.payload.progress
                course.status = action.payload.progress >= 100 ? "Completed" : "In Progress"
                item.learning.completedCourses = item.learning.enrolledCourses.filter((enrolled) => enrolled.status === "Completed").length
                item.activity.coursesInProgress = item.learning.enrolledCourses.filter((enrolled) => enrolled.status === "In Progress").length
        }
    }
})
    export const {addTrainee, removeTrainee, updateTrainee, enrollCourse, saveCourse, updateCourseProgress} = traineeSlice.actions
export default traineeSlice.reducer