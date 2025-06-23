// "use client"

// import { useEffect, useState } from "react"
// import { getLayout as getLocalStorageLayout } from "@/lib/layoutStorage"
// import type { ComponentConfig } from "@/types/contentful"
// import ClientHeroBlock from "@/components/landing/HeroBlock"
// import ClientTwoColumnBlock from "@/components/landing/TwoColumnBlock"
// import ClientImageGridBlock from "@/components/landing/ImageGridBlock"
// import DemoNavigation from "@/components/navigation/DemoNavigation"

// interface ClientLandingPageProps {
//   slug: string
// }

// function ClientLandingPage({ slug }: ClientLandingPageProps) {
//   const [components, setComponents] = useState<ComponentConfig[]>([])
//   const [loading, setLoading] = useState(true)
//   const [layoutName, setLayoutName] = useState("")

//   useEffect(() => {
//     const loadLayout = () => {
//       const savedLayout = getLocalStorageLayout(slug)
//       if (savedLayout) {
//         setComponents(savedLayout.components)
//         setLayoutName(savedLayout.name)
//       }
//       setLoading(false)
//     }

//     loadLayout()

//     const handleStorageChange = () => {
//       loadLayout()
//     }

//     window.addEventListener("storage", handleStorageChange)

//     window.addEventListener("focus", handleStorageChange)

//     return () => {
//       window.removeEventListener("storage", handleStorageChange)
//       window.removeEventListener("focus", handleStorageChange)
//     }
//   }, [slug])

//   if (loading) {
//     return (
//       <>
//         <DemoNavigation />
//         <main style={{ paddingTop: "4rem", textAlign: "center", padding: "2rem" }}>
//           <div>Loading...</div>
//         </main>
//       </>
//     )
//   }

//   return (
//     <>
//       <DemoNavigation />
//       <main style={{ paddingTop: "4rem" }}>
//         {components.length > 0 && (
//           <div
//             style={{
//               background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//               color: "white",
//               padding: "1rem 2rem",
//               textAlign: "center",
//               fontSize: "0.875rem",
//               fontWeight: "500",
//             }}
//           >
//              {layoutName} - Built with the drag & drop builder! Edit it at{" "}
//             <a href="/demo" style={{ color: "white", textDecoration: "underline" }}>
//               /demo
//             </a>
//           </div>
//         )}
//         {components.length === 0 ? (
//           <div
//             style={{
//               minHeight: "calc(100vh - 4rem)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               padding: "2rem",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               color: "white",
//             }}
//           >
//             <div>
//               <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}> No Content Yet</h1>
//               <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: "0.9" }}>
//                 This page hasn't been built yet. Use the drag & drop builder to create it!
//               </p>
//               <a
//                 href="/demo"
//                 style={{
//                   background: "white",
//                   color: "#667eea",
//                   padding: "1rem 2rem",
//                   borderRadius: "8px",
//                   fontWeight: "600",
//                   textDecoration: "none",
//                   display: "inline-block",
//                 }}
//               >
//                  Build This Page
//               </a>
//             </div>
//           </div>
//         ) : (
//           components.map((component: ComponentConfig) => {
//             switch (component.type) {
//               case "hero":
//                 return <ClientHeroBlock key={component.id} content={component.content as any} />
//               case "twoColumn":
//                 return <ClientTwoColumnBlock key={component.id} content={component.content as any} />
//               case "imageGrid":
//                 return <ClientImageGridBlock key={component.id} content={component.content as any} />
//               default:
//                 return null
//             }
//           })
//         )}
//       </main>
//     </>
//   )
// }

// export default ClientLandingPage

"use client"

import Link from "next/link"
import GlobalNavigation from "@/components/navigation/GlobalNavigation"

export default function NotFound() {
  return (
    <>
      <GlobalNavigation />
      <main className="not-found-main">
        <div className="not-found-container">
          <div className="not-found-content">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">Page Not Found</h2>
            <p className="error-description">The page you're looking for doesn't exist.</p>
            <Link href="/" className="home-button">
              Go Home
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .not-found-main {
          padding-top: 4rem;
          min-height: 100vh;
          min-height: 100dvh;
        }

        .not-found-container {
          min-height: calc(100vh - 4rem);
          min-height: calc(100dvh - 4rem);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .not-found-content {
          max-width: 500px;
          width: 100%;
        }

        .error-code {
          font-size: 6rem;
          margin-bottom: 1rem;
          color: #ef4444;
          font-weight: 700;
          line-height: 1;
        }

        .error-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #374151;
          font-weight: 600;
        }

        .error-description {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          color: #6b7280;
          line-height: 1.5;
        }

        .home-button {
          background: #2563eb;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          display: inline-block;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .home-button:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .error-code {
            font-size: 5rem;
          }

          .error-title {
            font-size: 1.75rem;
          }

          .error-description {
            font-size: 1rem;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .not-found-container {
            padding: 1.5rem 1rem;
          }

          .error-code {
            font-size: 4rem;
          }

          .error-title {
            font-size: 1.5rem;
          }

          .error-description {
            font-size: 0.9375rem;
            margin-bottom: 1.5rem;
          }

          .home-button {
            padding: 0.875rem 1.75rem;
            font-size: 0.9375rem;
            width: 100%;
            max-width: 280px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .not-found-container {
            padding: 1rem 0.75rem;
          }

          .error-code {
            font-size: 3rem;
          }

          .error-title {
            font-size: 1.25rem;
          }

          .error-description {
            font-size: 0.875rem;
          }

          .home-button {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
          }
        }

        /* Very Small Screens */
        @media (max-width: 320px) {
          .error-code {
            font-size: 2.5rem;
          }

          .error-title {
            font-size: 1.125rem;
          }

          .error-description {
            font-size: 0.8125rem;
          }
        }

        /* Landscape Mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .not-found-container {
            padding: 1rem;
          }

          .error-code {
            font-size: 3rem;
            margin-bottom: 0.5rem;
          }

          .error-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }

          .error-description {
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }

          .home-button {
            padding: 0.625rem 1.25rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </>
  )
}
