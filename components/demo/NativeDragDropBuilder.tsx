"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { SimpleRootState } from "@/store/simpleStore"
import { reorderComponents, addComponent, removeComponent, undo, redo } from "@/store/simpleDragDropSlice"
import type { ComponentConfig } from "@/types/contentful"
import styles from "./NativeDragDropBuilder.module.css"

export default function NativeDragDropBuilder() {
  const dispatch = useDispatch()
  const { components, availableComponents, history, historyIndex, isAutoSaving, lastSaved } = useSelector(
    (state: SimpleRootState) => state.simpleDragDrop,
  )
  const [mounted, setMounted] = useState(false)
  const [draggedItem, setDraggedItem] = useState<ComponentConfig | null>(null)
  const [draggedFromIndex, setDraggedFromIndex] = useState<number | null>(null)
  const [draggedFromSource, setDraggedFromSource] = useState<"available" | "layout" | null>(null)

  useEffect(() => {
    setMounted(true)
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

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  if (!mounted) {
    return <div className={styles.loading}>Loading drag & drop builder...</div>
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
          <div className={styles.saveStatus}>
            {isAutoSaving ? (
              <span className={styles.saving}> Saving...</span>
            ) : lastSaved ? (
              <span className={styles.saved}> Saved {new Date(lastSaved).toLocaleTimeString()}</span>
            ) : (
              <span className={styles.ready}>Ready to build!</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <h2>Available Components</h2>
          <p className={styles.instruction}>Drag these to the layout area →</p>
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
          <h2> Page Layout</h2>
          <p className={styles.instruction}>
            {components.length === 0 ? "Drag components here to build your page" : "Your page layout:"}
          </p>
          <div
            className={styles.layoutArea}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, components.length)}
          >
            {components.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}></div>
                <h3>Start Building!</h3>
                <p>Drag components from the left sidebar to create your landing page</p>
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

      {components.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.jsonPreview}>
            <h3> Generated JSON Config:</h3>
            <pre className={styles.jsonCode}>
              {JSON.stringify({ components: components.map((c) => ({ id: c.id, type: c.type })) }, null, 2)}
            </pre>
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
            <h3>Hero Block</h3>
            <p>Full-width hero with heading, subtitle, CTA & background image</p>
          </div>
        </div>
      )
    case "twoColumn":
      return (
        <div className={styles.twoColumnPreview}>
          <div className={styles.previewIcon}>📰</div>
          <div className={styles.previewContent}>
            <h3>Two Column Row</h3>
            <p>Left: heading, subtitle, CTA | Right: image</p>
          </div>
        </div>
      )
    case "imageGrid":
      return (
        <div className={styles.imageGridPreview}>
          <div className={styles.previewIcon}>🖼️</div>
          <div className={styles.previewContent}>
            <h3>2x2 Image Grid</h3>
            <p>Grid of four optimized images</p>
          </div>
        </div>
      )
    default:
      return <div>Unknown Component</div>
  }
}
