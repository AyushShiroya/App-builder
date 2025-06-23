"use client"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store"
import DragDropBuilder from "./DragDropBuilder"

declare global {
  interface Window {
    contentfulSdk: any
  }
}

export default function ContentfulAppWrapper() {
  const [sdk, setSdk] = useState<any>(null)

  useEffect(() => {
    const checkSdk = () => {
      if (window.contentfulSdk) {
        setSdk(window.contentfulSdk)
      } else {
        setTimeout(checkSdk, 100)
      }
    }
    checkSdk()
  }, [])

  if (!sdk) {
    return <div>Loading Contentful App...</div>
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <DragDropBuilder />
      </PersistGate>
    </Provider>
  )
}
