"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { SimpleRootState } from "@/store/simpleStore"
import {
  reorderComponents,
  addComponent,
  removeComponent,
  undo,
  redo,
  setComponents,
} from "@/store/simpleDragDropSlice"
import type { ComponentConfig } from "@/types/contentful"
import { saveLayout, getLayouts, getLayout, deleteLayout, type SavedLayout } from "@/lib/layoutStorage"
import styles from "./EnhancedDragDropBuilder.module.css"

export default function EnhancedDragDropBuilder() {
  const dispatch = useDispatch()
  const { components, availableComponents, history, historyIndex, isAutoSaving, lastSaved } = useSelector(
    (state: SimpleRootState) => state.simpleDragDrop,
  )
  const [mounted, setMounted] = useState(false)
  const [draggedItem, setDraggedItem] = useState<ComponentConfig | null>(null)
  const [draggedFromIndex, setDraggedFromIndex] = useState<number | null>(null)
  const [draggedFromSource, setDraggedFromSource] = useState<"available" | "layout" | null>(null)
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [layoutName, setLayoutName] = useState("")
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const [showJsonPreview, setShowJsonPreview] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSavedLayouts(getLayouts())
  }, [])

  const handleDragStart = (
    e: React.DragEvent,
    component: ComponentConfig,
    source: "available" | "layout",
    index?: number,
  ) => {
    setDraggedItem(component)
    setDraggedFromSource(source)
    if (index !== undefined) {
      setDraggedFromIndex(index)
    }
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault()

    if (!draggedItem || !draggedFromSource) return

    if (draggedFromSource === "available") {
      dispatch(addComponent(draggedItem))
    } else if (draggedFromSource === "layout" && draggedFromIndex !== null && targetIndex !== undefined) {
      const newComponents = Array.from(components)
      const [reorderedItem] = newComponents.splice(draggedFromIndex, 1)
      newComponents.splice(targetIndex, 0, reorderedItem)
      dispatch(reorderComponents(newComponents))
    }

    setDraggedItem(null)
    setDraggedFromIndex(null)
    setDraggedFromSource(null)
  }

  const handleRemoveComponent = (componentId: string) => {
    dispatch(removeComponent(componentId))
  }

  const handleUndo = () => {
    dispatch(undo())
  }

  const handleRedo = () => {
    dispatch(redo())
  }

  const handleSaveLayout = () => {
    if (!layoutName.trim()) return

    const layoutId = `layout-${Date.now()}`
    saveLayout(layoutId, layoutName.trim(), components)
    setSavedLayouts(getLayouts())
    setLayoutName("")
    setShowSaveDialog(false)

    saveLayout("page-1", "Landing Page 1", components)
    saveLayout("page-2", "Landing Page 2", components)
  }

  const handleLoadLayout = (layoutId: string) => {
    const layout = getLayout(layoutId)
    if (layout) {
      dispatch(setComponents(layout.components))
      setShowLoadDialog(false)
    }
  }

  const handleDeleteLayout = (layoutId: string) => {
    deleteLayout(layoutId)
    setSavedLayouts(getLayouts())
  }

  const handleSaveAsPage = (pageId: "page-1" | "page-2") => {
    const pageName = pageId === "page-1" ? "Landing Page 1" : "Landing Page 2"

    if (components.length === 0) {
      alert("Please add some components before saving!")
      return
    }

    try {
      saveLayout(pageId, pageName, components)

      // Show success message with link
      const confirmed = confirm(
        `Saved as ${pageName}!\n\nWould you like to view the page now?\n\nClick OK to open /landing/${pageId} in a new tab.`,
      )

      if (confirmed) {
        const url = `/landing/${pageId}?t=${Date.now()}`
        window.open(url, "_blank")
      }
    } catch (error) {
      console.error("Error saving layout:", error)
      alert("Failed to save layout. Please try again.")
    }
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  if (!mounted) {
    return <div className={styles.loading}>Loading builder...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1> Landing Page Builder</h1>
        <div className={styles.controls}>
          <button onClick={handleUndo} disabled={!canUndo} className={styles.button}>
            ↶ Undo
          </button>
          <button onClick={handleRedo} disabled={!canRedo} className={styles.button}>
            ↷ Redo
          </button>
          <button
            onClick={() => setShowSaveDialog(true)}
            className={styles.saveButton}
            disabled={components.length === 0}
          >
             Save
          </button>
          <button onClick={() => setShowLoadDialog(true)} className={styles.loadButton}>
             Load
          </button>
          <div
            className={`${styles.saveStatus} ${isAutoSaving ? styles.saving : lastSaved ? styles.saved : styles.ready}`}
          >
            {isAutoSaving ? "Saving..." : lastSaved ? "Saved" : "Ready"}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <h2>Components</h2>
          <div className={styles.instruction}>Drag components to the layout area to build your page</div>
          <div className={styles.availableComponents}>
            {availableComponents.map((component, index) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component, "available")}
                className={styles.componentCard}
              >
                <ComponentPreview component={component} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.layoutHeader}>
            <div className={styles.layoutHeaderTop}>
              <div>
                <h2 className={styles.layoutTitle}>
                   Page Layout
                  {components.length > 0 && <span className={styles.componentCount}>{components.length}</span>}
                </h2>
                <p className={styles.layoutInstruction}>
                  {components.length === 0
                    ? "Drag components here to start building"
                    : "Drag handles to reorder • Click × to remove"}
                </p>
              </div>
              {components.length > 0 && (
                <div className={styles.quickSave}>
                  <button onClick={() => handleSaveAsPage("page-1")} className={styles.quickSaveButton}>
                    Save as Page 1
                  </button>
                  <button onClick={() => handleSaveAsPage("page-2")} className={styles.quickSaveButton}>
                    Save as Page 2
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.layoutContainer}>
            <div
              className={`${styles.layoutArea} ${draggedFromSource === "available" ? styles.dragOver : ""}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, components.length)}
            >
              {components.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📋</div>
                  <h3>Start Building Your Page</h3>
                  <p>Drag components from the sidebar to create your landing page layout</p>
                </div>
              ) : (
                components.map((component, index) => (
                  <div
                    key={component.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component, "layout", index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={styles.layoutComponent}
                  >
                    <div className={styles.dragHandle} title="Drag to reorder">
                      ⋮⋮
                    </div>
                    <ComponentPreview component={component} />
                    <button
                      onClick={() => handleRemoveComponent(component.id)}
                      className={styles.removeButton}
                      title="Remove component"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {components.length > 0 && (
        <div className={styles.bottomPanel}>
          <div className={styles.previewLinks}>
            <a href="/landing/page-1" target="_blank" className={styles.previewLink} rel="noreferrer">
               View Page 1
            </a>
            <a href="/landing/page-2" target="_blank" className={styles.previewLink} rel="noreferrer">
               View Page 2
            </a>
          </div>
          <div className={styles.jsonToggle}>
            <span style={{ fontSize: "0.75rem", color: "#64748b" }}>JSON Config:</span>
            <button
              onClick={() => setShowJsonPreview(!showJsonPreview)}
              className={`${styles.toggleButton} ${showJsonPreview ? styles.active : ""}`}
            >
              {showJsonPreview ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      )}

      {showJsonPreview && components.length > 0 && (
        <div className={styles.jsonPreview}>
          <div className={styles.jsonHeader}>
            <span>JSON Configuration</span>
            <button onClick={() => setShowJsonPreview(false)} className={styles.jsonClose}>
              ×
            </button>
          </div>
          <pre className={styles.jsonCode}>
            {JSON.stringify({ components: components.map((c) => ({ id: c.id, type: c.type })) }, null, 2)}
          </pre>
        </div>
      )}

      {showSaveDialog && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3> Save Layout</h3>
            <input
              type="text"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              placeholder="Enter layout name..."
              className={styles.input}
              autoFocus
            />
            <div className={styles.modalButtons}>
              <button onClick={() => setShowSaveDialog(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button onClick={handleSaveLayout} disabled={!layoutName.trim()} className={styles.saveButton}>
                Save Layout
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoadDialog && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3> Load Layout</h3>
            {savedLayouts.length === 0 ? (
              <p style={{ color: "#64748b", textAlign: "center", padding: "2rem" }}>
                No saved layouts found. Create and save a layout first.
              </p>
            ) : (
              <div className={styles.layoutList}>
                {savedLayouts.map((layout) => (
                  <div key={layout.id} className={styles.layoutItem}>
                    <div className={styles.layoutInfo}>
                      <h4>{layout.name}</h4>
                      <p>{layout.components.length} components</p>
                      <small>Updated: {new Date(layout.updatedAt).toLocaleString()}</small>
                    </div>
                    <div className={styles.layoutActions}>
                      <button onClick={() => handleLoadLayout(layout.id)} className={styles.loadButton}>
                        Load
                      </button>
                      <button onClick={() => handleDeleteLayout(layout.id)} className={styles.deleteButton}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.modalButtons}>
              <button onClick={() => setShowLoadDialog(false)} className={styles.cancelButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ComponentPreview({ component }: { component: ComponentConfig }) {
  switch (component.type) {
    case "hero":
      return (
        <div className={styles.heroPreview}>
          <div className={styles.previewIcon}>💎</div>
          <div className={styles.previewContent}>
            <h3>Hero Section</h3>
            <p>Full-width hero with heading, subtitle, CTA & background</p>
          </div>
        </div>
      )
    case "twoColumn":
      return (
        <div className={styles.twoColumnPreview}>
          <div className={styles.previewIcon}>📰</div>
          <div className={styles.previewContent}>
            <h3>Two Column Layout</h3>
            <p>Text content on left, image on right</p>
          </div>
        </div>
      )
    case "imageGrid":
      return (
        <div className={styles.imageGridPreview}>
          <div className={styles.previewIcon}>🖼️</div>
          <div className={styles.previewContent}>
            <h3>Image Grid</h3>
            <p>2x2 grid of optimized images</p>
          </div>
        </div>
      )
    default:
      return <div>Unknown Component</div>
  }
}
