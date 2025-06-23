import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import dragDropReducer from "./dragDropSlice"
import { autoSaveMiddleware } from "./middleware"

const persistConfig = {
  key: "contentful-builder",
  storage,
  whitelist: ["components", "history", "historyIndex"],
}

const persistedReducer = persistReducer(persistConfig, dragDropReducer)

export const store = configureStore({
  reducer: {
    dragDrop: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(autoSaveMiddleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
