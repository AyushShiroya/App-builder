"use client"

import { useState } from "react"
import styles from "./DragDropGuide.module.css"

export default function DragDropGuide() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Available Components",
      description: "Three component types are available in the left sidebar",
      details: [
        "Hero Block: Full-width section with heading, subtitle, CTA, and background image",
        "Two Column Row: Left column (text + CTA) and right column (image)",
        "2x2 Image Grid: Grid of four optimized images",
      ],
    },
    {
      title: "Drag to Layout",
      description: "Drag components from sidebar to the layout area",
      details: [
        "Click and hold on any component in the sidebar",
        "Drag it to the layout area on the right",
        "Drop it to add the component to your page",
        "Each component gets a unique ID when added",
      ],
    },
    {
      title: "Reorder Components",
      description: "Rearrange components within the layout area",
      details: [
        "Use the drag handle (⋮⋮) on the left of each component",
        "Drag components up or down to reorder them",
        "The order determines how they appear on the final page",
        "Real-time preview of the new order",
      ],
    },
    {
      title: "State Management",
      description: "Undo/Redo and auto-save functionality",
      details: [
        "Undo/Redo buttons track all changes",
        "Auto-save triggers 2 seconds after changes",
        "Redux Persist saves state across browser refreshes",
        "History is maintained for all operations",
      ],
    },
    {
      title: "JSON Output",
      description: "Configuration is saved as JSON to Contentful",
      details: [
        "Each change updates the layoutConfig JSON",
        "JSON contains component order and configuration",
        "Frontend reads this JSON to render pages",
        "Supports dynamic content from Contentful fields",
      ],
    },
  ]

  return (
    <div className={styles.guide}>
      <div className={styles.header}>
        <h2>How Drag & Drop Works</h2>
        <p>Interactive guide to the landing page builder</p>
      </div>

      <div className={styles.content}>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`${styles.step} ${activeStep === index ? styles.active : ""}`}
            >
              <span className={styles.stepNumber}>{index + 1}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.details}>
          <h3>{steps[activeStep].title}</h3>
          <p>{steps[activeStep].description}</p>
          <ul>
            {steps[activeStep].details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.keyFeatures}>
          <h4>Key Features:</h4>
          <div className={styles.features}>
            <span className={styles.feature}>🎯 Visual Editor</span>
            <span className={styles.feature}>🔄 Undo/Redo</span>
            <span className={styles.feature}>💾 Auto-save</span>
            <span className={styles.feature}>📱 Responsive</span>
            <span className={styles.feature}>⚡ Real-time</span>
          </div>
        </div>
      </div>
    </div>
  )
}
