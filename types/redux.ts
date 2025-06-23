import type { ComponentConfig } from "./contentful"

export interface SimpleDragDropState {
  components: ComponentConfig[]
  availableComponents: ComponentConfig[]
  isDragging: boolean
  history: ComponentConfig[][]
  historyIndex: number
  lastSaved: string | null
  isAutoSaving: boolean
}

export interface SimpleRootState {
  simpleDragDrop: SimpleDragDropState
}
