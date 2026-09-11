import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    certificates: []
}

export const certificateSlice = createSlice({
    name: "certificate",
    initialState,
    reducers: {
        addCertificate(state,action) {
            state.certificates.push(action.payload)
        },
        removeCertificate(state,action) {
            state.certificates = state.certificates.filter((item)=> item.id !== action.payload.id)

        },
        updateCertificate(state,action) {
            const item = state.certificates.find((p)=> p.id === action.payload.id)

            if (!item) return
            Object.assign(item, action.payload)
        }
    }
})

export default certificateSlice.reducer
export const {addCertificate, removeCertificate,updateCertificate} = certificateSlice.actions