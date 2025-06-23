"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import type { RootState } from "@/store"
import { reorderComponents, addComponent, removeComponent, undo, redo } from "@/store/dragDropSlice"
import type { ComponentConfig } from "@/types/contentful"
import styles from "./DragDropBuilder.module.css"

export default function DragDropBuilder() {
  const dispatch = useDispatch()
  const { components, availableComponents, history, historyIndex, isAutoSaving, lastSaved } = useSelector(
    (state: RootState) => state.dragDrop,
  )
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === "available" && destination.droppableId === "layout") {
      const component = availableComponents[source.index]
      dispatch(addComponent(component))
    } else if (source.droppableId === "layout" && destination.droppableId === "layout") {
      const newComponents = Array.from(components) as ComponentConfig[]
      const [reorderedItem] = newComponents.splice(source.index, 1)
      newComponents.splice(destination.index, 0, reorderedItem)
      dispatch(reorderComponents(newComponents))
    }
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
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Landing Page Builder</h1>
        <div className={styles.controls}>
          <button onClick={handleUndo} disabled={!canUndo} className={styles.button}>
            Undo
          </button>
          <button onClick={handleRedo} disabled={!canRedo} className={styles.button}>
            Redo
          </button>
          <div className={styles.saveStatus}>
            {isAutoSaving ? (
              <span className={styles.saving}>Saving...</span>
            ) : lastSaved ? (
              <span className={styles.saved}>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
            ) : null}
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <h2>Available Components</h2>
            <Droppable droppableId="available" isDropDisabled={true}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.availableComponents}>
                  {availableComponents.map((component: ComponentConfig, index: number) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${styles.componentCard} ${snapshot.isDragging ? styles.dragging : ""}`}
                        >
                          <ComponentPreview component={component} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className={styles.main}>
            <h2>Page Layout</h2>
            <Droppable droppableId="layout">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`${styles.layoutArea} ${snapshot.isDraggingOver ? styles.dragOver : ""}`}
                >
                  {components.length === 0 ? (
                    <div className={styles.emptyState}>Drag components here to build your page</div>
                  ) : (
                    components.map((component: ComponentConfig, index: number) => (
                      <Draggable key={component.id} draggableId={component.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`${styles.layoutComponent} ${snapshot.isDragging ? styles.dragging : ""}`}
                          >
                            <div {...provided.dragHandleProps} className={styles.dragHandle}>
                              ⋮⋮
                            </div>
                            <ComponentPreview component={component} />
                            <button onClick={() => handleRemoveComponent(component.id)} className={styles.removeButton}>
                              ×
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

function ComponentPreview({ component }: { component: ComponentConfig }) {
  switch (component.type) {
    case "hero":
      return (
        <div className={styles.heroPreview}>
          <div className={styles.previewLabel}>Hero Block</div>
          <div className={styles.previewContent}>
            <h3>Hero Section</h3>
            <p>Heading, subtitle, CTA, background image</p>
          </div>
        </div>
      )
    case "twoColumn":
      return (
        <div className={styles.twoColumnPreview}>
          <div className={styles.previewLabel}>Two Column Row</div>
          <div className={styles.previewContent}>
            <h3>Two Column Layout</h3>
            <p>Left: heading, subtitle, CTA | Right: image</p>
          </div>
        </div>
      )
    case "imageGrid":
      return (
        <div className={styles.imageGridPreview}>
          <div className={styles.previewLabel}>2x2 Image Grid</div>
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
