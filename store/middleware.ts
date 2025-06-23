import type { Middleware } from "@reduxjs/toolkit"
import { setSaved, setAutoSaving } from "./dragDropSlice"

let saveTimeout: NodeJS.Timeout

export const autoSaveMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  const typedAction = action as { type: string }
  if (
    typedAction.type === "dragDrop/setComponents" ||
    typedAction.type === "dragDrop/addComponent" ||
    typedAction.type === "dragDrop/removeComponent" ||
    typedAction.type === "dragDrop/reorderComponents"
  ) {
    clearTimeout(saveTimeout)
    store.dispatch(setAutoSaving(true))

    saveTimeout = setTimeout(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        store.dispatch(setSaved(new Date().toISOString()))
      } catch (error) {
        console.error("Auto-save failed:", error)
        store.dispatch(setAutoSaving(false))
      }
    }, 2000)
  }

  return result
}
