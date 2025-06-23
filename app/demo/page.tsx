"use client"

import { Provider } from "react-redux"
import { simpleStore } from "@/store/simpleStore"
import EnhancedDragDropBuilder from "@/components/demo/EnhancedDragDropBuilder"
import styles from "./page.module.css"

export default function DemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1> Drag & Drop Landing Page Builder</h1>
        <p>Build your pages and see them live instantly!</p>
      </div>

      <div className={styles.quickGuide}>
        <div className={styles.step}>
          <span className={styles.stepNumber}>1</span>
          <span>
            <strong>Drag components</strong> from left sidebar to layout area
          </span>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNumber}>2</span>
          <span>
            <strong>Reorder & customize</strong> your layout
          </span>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNumber}>3</span>
          <span>
            <strong>Save as Page 1 or Page 2</strong> to see it live
          </span>
        </div>
        <div className={styles.step}>
          <span className={styles.stepNumber}>4</span>
          <span>
            <strong>Visit the live pages</strong> to see your creation!
          </span>
        </div>
      </div>

      <div className={styles.builderContainer}>
        <Provider store={simpleStore}>
          <EnhancedDragDropBuilder />
        </Provider>
      </div>
    </div>
  )
}
