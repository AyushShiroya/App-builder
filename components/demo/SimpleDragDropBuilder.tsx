"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import type { SimpleRootState } from "@/store/simpleStore"
import { reorderComponents, addComponent, removeComponent, undo, redo } from "@/store/simpleDragDropSlice"
import type { ComponentConfig } from "@/types/contentful"
import styles from "./SimpleDragDropBuilder.module.css"

export default function SimpleDragDropBuilder() {
  const dispatch = useDispatch()
  const { components, availableComponents, history, historyIndex, isAutoSaving, lastSaved } = useSelector(
    (state: SimpleRootState) => state.simpleDragDrop,
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
      const newComponents = Array.from(components)
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <h2> Available Components</h2>
            <p className={styles.instruction}> Drag these to the layout area →</p>
            <Droppable droppableId="available" isDropDisabled={true}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.availableComponents}>
                  {availableComponents.map((component, index) => (
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
            <h2> Page Layout</h2>
            <p className={styles.instruction}>
              {components.length === 0 ? "Drag components here to build your page" : "Your page layout:"}
            </p>
            <Droppable droppableId="layout">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`${styles.layoutArea} ${snapshot.isDraggingOver ? styles.dragOver : ""}`}
                >
                  {components.length === 0 ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📋</div>
                      <h3>Start Building!</h3>
                      <p>Drag components from the left sidebar to create your landing page</p>
                    </div>
                  ) : (
                    components.map((component, index) => (
                      <Draggable key={component.id} draggableId={component.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`${styles.layoutComponent} ${snapshot.isDragging ? styles.dragging : ""}`}
                          >
                            <div {...provided.dragHandleProps} className={styles.dragHandle} title="Drag to reorder">
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

      {components.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.jsonPreview}>
            <h3>📄 Generated JSON Config:</h3>
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
