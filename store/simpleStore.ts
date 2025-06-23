import { configureStore } from "@reduxjs/toolkit"
import simpleDragDropReducer from "./simpleDragDropSlice"
import { simpleAutoSaveMiddleware } from "./simpleMiddleware"

export const simpleStore = configureStore({
  reducer: {
    simpleDragDrop: simpleDragDropReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }).concat(simpleAutoSaveMiddleware),
})

export type SimpleRootState = ReturnType<typeof simpleStore.getState>
export type SimpleAppDispatch = typeof simpleStore.dispatch
