import {createSlice} from "@reduxjs/toolkit"
import trainers from "./trainerData"
const initialState = {
    trainer: trainers
}

export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        addTrainer(state,action) {
            state.trainer.push(action.payload)
        },
        removeTrainer(state,action) {
            state.trainer = state.trainer.filter((item)=> item.id !== action.payload.id)

        },
        updateTrainer(state,action) {
            const item = state.trainer.find((p)=> p.id === action.payload.id)

            if (!item) return
            Object.assign(item, action.payload)
        }
    }
})
export default trainerSlice.reducer
export const {addTrainer, removeTrainer, updateTrainer} = trainerSlice.actions