import type { Middleware } from "@reduxjs/toolkit"
import { setSaved, setAutoSaving } from "./simpleDragDropSlice"

let saveTimeout: NodeJS.Timeout

export const simpleAutoSaveMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action)

  if (
    action.type === "simpleDragDrop/setComponents" ||
    action.type === "simpleDragDrop/addComponent" ||
    action.type === "simpleDragDrop/removeComponent" ||
    action.type === "simpleDragDrop/reorderComponents"
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
