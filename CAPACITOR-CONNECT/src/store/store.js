import { configureStore,combineReducers } from "@reduxjs/toolkit";

import { persistStore } from "redux-persist"
import persistReducer from "redux-persist/es/persistReducer";

import certificateReducer from "../features/certificates/certificateSlice";
import traineeReducer from "../features/Trainee/tranieeSlice";
import trainerReducer from "../features/Trainer/trainerSlice";  
import courseReducer from "../features/courses/courseSlice";
import assessmentReducer from "../features/assessments/assessmentSlice";
import complaintReducer from "../features/complaints/complaintSlice";
import resourceReducer from "../features/resources/resourceSlice";
import announcementReducer from "../features/announcements/announcementSlice";
const storage = {
  getItem: (key) => {
    return Promise.resolve(
      window.localStorage.getItem(key)
    );
  },

  setItem: (key, value) => {
    window.localStorage.setItem(key, value);

    return Promise.resolve();
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);

    return Promise.resolve();
  },

};

export const rootReducer = combineReducers({
  certificateReducer,
  traineeReducer,
  trainerReducer,
  courseReducer,
  assessmentReducer,
  complaintReducer,
  resourceReducer,
  announcementReducer,
})
export const persistConfig = {
    key: "root",
    storage,
}
export const persistedReducer = persistReducer(
    persistConfig,
 rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false
    }).concat()
})
export const persistor = persistStore(store)