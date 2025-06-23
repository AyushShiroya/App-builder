import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ComponentConfig } from "@/types/contentful"
import { SimpleDragDropState } from "@/types/redux"

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
        url: "/placeholder.svg?height=600&width=1200",
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
        url: "/placeholder.svg?height=400&width=600",
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
          url: "/placeholder.svg?height=300&width=300",
          width: 300,
          height: 300,
        },
        {
          sys: { id: "placeholder-2" },
          title: "Grid Image 2",
          url: "/placeholder.svg?height=300&width=300",
          width: 300,
          height: 300,
        },
        {
          sys: { id: "placeholder-3" },
          title: "Grid Image 3",
          url: "/placeholder.svg?height=300&width=300",
          width: 300,
          height: 300,
        },
        {
          sys: { id: "placeholder-4" },
          title: "Grid Image 4",
          url: "/placeholder.svg?height=300&width=300",
          width: 300,
          height: 300,
        },
      ],
    },
  },
]

const initialState: SimpleDragDropState = {
  components: [],
  availableComponents: initialComponents,
  isDragging: false,
  history: [[]],
  historyIndex: 0,
  lastSaved: null,
  isAutoSaving: false,
}

const dragDropSlice = createSlice({
  name: "dragDrop",
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<ComponentConfig[]>) => {
      state.components = action.payload
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...action.payload])
      state.historyIndex = state.history.length - 1
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
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter((component: { id: string }) => component.id !== action.payload)
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push([...state.components])
      state.historyIndex = state.history.length - 1
    },
    reorderComponents: (state, action: PayloadAction<ComponentConfig[]>) => {
      state.components = action.payload
    },
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        state.components = [...state.history[state.historyIndex]]
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1
        state.components = [...state.history[state.historyIndex]]
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
} = dragDropSlice.actions

export default dragDropSlice.reducer
