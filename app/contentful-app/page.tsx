"use client"

import { Provider } from "react-redux"
import { simpleStore } from "@/store/simpleStore"
import EnhancedDragDropBuilder from "@/components/demo/EnhancedDragDropBuilder"

export default function ContentfulAppPage() {
  return (
    <Provider store={simpleStore}>
      <EnhancedDragDropBuilder />
    </Provider>
  )
}
