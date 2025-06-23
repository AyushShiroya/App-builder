import type { ComponentConfig } from "@/types/contentful"

export interface SavedLayout {
  id: string
  name: string
  components: ComponentConfig[]
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "landing-builder-layouts"

export function saveLayout(layoutId: string, name: string, components: ComponentConfig[]): void {
  if (typeof window === "undefined") return

  try {
    const layouts = getLayouts()
    const now = new Date().toISOString()

    const existingIndex = layouts.findIndex((layout) => layout.id === layoutId)
    const layout: SavedLayout = {
      id: layoutId,
      name,
      components: [...components], // Create a deep copy
      createdAt: existingIndex >= 0 ? layouts[existingIndex].createdAt : now,
      updatedAt: now,
    }

    if (existingIndex >= 0) {
      layouts[existingIndex] = layout
    } else {
      layouts.push(layout)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts))

    // Also save individual layout for direct access
    localStorage.setItem(`layout-${layoutId}`, JSON.stringify(layout))

    console.log(`Layout saved: ${layoutId}`, layout) // Debug log
  } catch (error) {
    console.error("Failed to save layout:", error)
  }
}

export function getLayouts(): SavedLayout[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load layouts:", error)
    return []
  }
}

export function getLayout(layoutId: string): SavedLayout | null {
  if (typeof window === "undefined") return null

  try {
    // First try to get from individual storage
    const individualStored = localStorage.getItem(`layout-${layoutId}`)
    if (individualStored) {
      const layout = JSON.parse(individualStored)
      console.log(`Layout loaded: ${layoutId}`, layout) // Debug log
      return layout
    }

    // Fallback to getting from layouts array
    const layouts = getLayouts()
    const layout = layouts.find((layout) => layout.id === layoutId) || null
    console.log(`Layout loaded from array: ${layoutId}`, layout) // Debug log
    return layout
  } catch (error) {
    console.error("Failed to load layout:", error)
    return null
  }
}

export function deleteLayout(layoutId: string): void {
  if (typeof window === "undefined") return

  try {
    const layouts = getLayouts().filter((layout) => layout.id !== layoutId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts))
  } catch (error) {
    console.error("Failed to delete layout:", error)
  }
}

// Get current builder components
export function getCurrentBuilderComponents(): ComponentConfig[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem("landing-builder-components")
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load current components:", error)
    return []
  }
}
