import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ComponentConfig } from "@/types/contentful"

interface SimpleDragDropState {
  components: ComponentConfig[]
  availableComponents: ComponentConfig[]
  isDragging: boolean
  history: ComponentConfig[][]
  historyIndex: number
  lastSaved: string | null
  isAutoSaving: boolean
}

const initialComponents: ComponentConfig[] = [
  {
    id: "hero-template",
    type: "hero",
    content: {
      heading: "Hero Heading",
      subtitle: "Hero Subtitle",
      ctaText: "Get Started",
      ctaUrl: "#",
      backgroundImage: {
        sys: { id: "placeholder" },
        title: "Hero Background",
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
        width: 1200,
        height: 600,
      },
    },
  },
  {
    id: "two-column-template",
    type: "twoColumn",
    content: {
      heading: "Two Column Heading",
      subtitle: "Two Column Subtitle",
      ctaText: "Learn More",
      ctaUrl: "#",
      image: {
        sys: { id: "placeholder" },
        title: "Two Column Image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        width: 600,
        height: 400,
      },
    },
  },
  {
    id: "image-grid-template",
    type: "imageGrid",
    content: {
      images: [
        {
          sys: { id: "placeholder-1" },
          title: "Grid Image 1",
          url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop",
          width: 300,
          height: 300,
        },
        {
          sys: { id: "placeholder-2" },
          title: "Grid Image 2",
          url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
          width: 300,
          height: 300,
        },
        {
          sys: { id: "placeholder-3" },
          title: "Grid Image 3",
          url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=300&fit=crop",
          width: 300,
          height: 300,
        },
        {
          sys: { id: "placeholder-4" },
          title: "Grid Image 4",
          url: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=300&h=300&fit=crop",
          width: 300,
          height: 300,
        },
      ],
    },
  },
]

const loadFromStorage = (): ComponentConfig[] => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("landing-builder-components")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  }
  return []
}

const initialState: SimpleDragDropState = {
  components: loadFromStorage(),
  availableComponents: initialComponents,
  isDragging: false,
  history: [loadFromStorage()],
  historyIndex: 0,
  lastSaved: null,
  isAutoSaving: false,
}

const simpleDragDropSlice = createSlice({
  name: "simpleDragDrop",
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<ComponentConfig[]>) => {
      state.components = action.payload
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...action.payload])
      state.historyIndex = state.history.length - 1

      if (typeof window !== "undefined") {
        localStorage.setItem("landing-builder-components", JSON.stringify(action.payload))
      }
    },
    addComponent: (state, action: PayloadAction<ComponentConfig>) => {
      const newComponent = {
        ...action.payload,
        id: `${action.payload.type}-${Date.now()}`,
      }
      state.components.push(newComponent)
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...state.components])
      state.historyIndex = state.history.length - 1

      if (typeof window !== "undefined") {
        localStorage.setItem("landing-builder-components", JSON.stringify(state.components))
      }
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter((component) => component.id !== action.payload)
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...state.components])
      state.historyIndex = state.history.length - 1

      if (typeof window !== "undefined") {
        localStorage.setItem("landing-builder-components", JSON.stringify(state.components))
      }
    },
    reorderComponents: (state, action: PayloadAction<ComponentConfig[]>) => {
      state.components = action.payload

      if (typeof window !== "undefined") {
        localStorage.setItem("landing-builder-components", JSON.stringify(action.payload))
      }
    },
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        state.components = [...state.history[state.historyIndex]]

        if (typeof window !== "undefined") {
          localStorage.setItem("landing-builder-components", JSON.stringify(state.components))
        }
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1
        state.components = [...state.history[state.historyIndex]]

        if (typeof window !== "undefined") {
          localStorage.setItem("landing-builder-components", JSON.stringify(state.components))
        }
      }
    },
    setSaved: (state, action: PayloadAction<string>) => {
      state.lastSaved = action.payload
      state.isAutoSaving = false
    },
    setAutoSaving: (state, action: PayloadAction<boolean>) => {
      state.isAutoSaving = action.payload
    },
  },
})

export const {
  setComponents,
  addComponent,
  removeComponent,
  reorderComponents,
  setDragging,
  undo,
  redo,
  setSaved,
  setAutoSaving,
} = simpleDragDropSlice.actions

export default simpleDragDropSlice.reducer
