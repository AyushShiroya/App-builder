

"use client"

import { useEffect, useState } from "react"
import { getLayout } from "@/lib/layoutStorage"
import type { ComponentConfig } from "@/types/contentful"
import HeroBlock from "@/components/landing/HeroBlock"
import TwoColumnBlock from "@/components/landing/TwoColumnBlock"
import ImageGridBlock from "@/components/landing/ImageGridBlock"
import DemoNavigation from "@/components/navigation/DemoNavigation"

interface ClientLandingPageProps {
  slug: string
}

export default function ClientLandingPage({ slug }: ClientLandingPageProps) {
  const [components, setComponents] = useState<ComponentConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [layoutName, setLayoutName] = useState("")

  useEffect(() => {
    const loadLayout = () => {
      const savedLayout = getLayout(slug)
      if (savedLayout) {
        setComponents(savedLayout.components)
        setLayoutName(savedLayout.name)
      }
      setLoading(false)
    }

    loadLayout()

    const handleStorageChange = () => {
      loadLayout()
    }

    window.addEventListener("storage", handleStorageChange)

    window.addEventListener("focus", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("focus", handleStorageChange)
    }
  }, [slug])

  if (loading) {
    return (
      <>
        <DemoNavigation />
        <main
          style={{
            paddingTop: "4rem",
            textAlign: "center",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <div>Loading...</div>
        </main>
      </>
    )
  }

  return (
    <>
      <DemoNavigation />
      <main style={{ paddingTop: "4rem" }}>
        {components.length > 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              padding: "1rem 2rem",
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {layoutName} - Built with the drag & drop builder! Edit it at{" "}
            <a href="/demo" style={{ color: "white", textDecoration: "underline" }}>
              /demo
            </a>
          </div>
        )}
        {components.length === 0 ? (
          <div
            style={{
              minHeight: "calc(100vh - 4rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingTop: "2rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              paddingBottom: "2rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <div>
              <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}> No Content Yet</h1>
              <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: "0.9" }}>
                This page hasn't been built yet. Use the drag & drop builder to create it!
              </p>
              <a
                href="/demo"
                style={{
                  background: "white",
                  color: "#667eea",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Build This Page
              </a>
            </div>
          </div>
        ) : (
          components.map((component: ComponentConfig) => {
            switch (component.type) {
              case "hero":
                return <HeroBlock key={component.id} content={component.content as any} />
              case "twoColumn":
                return <TwoColumnBlock key={component.id} content={component.content as any} />
              case "imageGrid":
                return <ImageGridBlock key={component.id} content={component.content as any} />
              default:
                return null
            }
          })
        )}
      </main>
    </>
  )
}
