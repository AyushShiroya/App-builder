// "use client"

// import Link from "next/link"
// import DemoNavigation from "@/components/navigation/DemoNavigation"

// export default function HomePage() {
//   return (
//     <>
//       <DemoNavigation />
//       <main style={{ paddingTop: "4rem" }}>
//         <div
//           style={{
//             minHeight: "calc(100vh - 4rem)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             padding: "2rem",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//           }}
//         >
//           <div>
//             <h1 style={{ fontSize: "4rem", marginBottom: "1rem", fontWeight: "700" }}>Landing Page Builder</h1>
//             <p style={{ fontSize: "1.5rem", marginBottom: "3rem", opacity: "0.9" }}>
//               Build beautiful landing pages with drag and drop functionality
//             </p>

//             <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
//               <Link
//                 href="/demo"
//                 style={{
//                   background: "white",
//                   color: "#667eea",
//                   padding: "1.25rem 2.5rem",
//                   borderRadius: "12px",
//                   fontWeight: "700",
//                   fontSize: "1.125rem",
//                   display: "inline-block",
//                   textDecoration: "none",
//                   boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
//                   transform: "translateY(0)",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.transform = "translateY(-2px)"
//                   e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.15)"
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)"
//                   e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)"
//                 }}
//               >
//                  Try Drag & Drop Demo
//               </Link>

//               <Link
//                 href="/landing/page-1"
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   color: "white",
//                   padding: "1.25rem 2.5rem",
//                   borderRadius: "12px",
//                   fontWeight: "600",
//                   fontSize: "1.125rem",
//                   display: "inline-block",
//                   textDecoration: "none",
//                   border: "2px solid rgba(255, 255, 255, 0.2)",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"
//                   e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
//                   e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
//                 }}
//               >
//                 View Demo Pages
//               </Link>
//             </div>

//             {/* <div
//               style={{
//                 marginTop: "3rem",
//                 padding: "2rem",
//                 background: "rgba(255, 255, 255, 0.1)",
//                 borderRadius: "12px",
//                 maxWidth: "600px",
//                 margin: "3rem auto 0",
//               }}
//             >
//               <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem" }}> Quick Start Guide:</h3>
//               <ol style={{ textAlign: "left", margin: "0", paddingLeft: "1.5rem" }}>
//                 <li style={{ marginBottom: "0.5rem" }}>Click "Try Drag & Drop Demo" button above</li>
//                 <li style={{ marginBottom: "0.5rem" }}>Drag components from left sidebar to right area</li>
//                 <li style={{ marginBottom: "0.5rem" }}>Reorder using drag handles (⋮⋮)</li>
//                 <li style={{ marginBottom: "0.5rem" }}>Use Undo/Redo buttons</li>
//                 <li>See your changes auto-save!</li>
//               </ol>
//             </div> */}
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

"use client"

import Link from "next/link"
import DemoNavigation from "@/components/navigation/DemoNavigation"

export default function HomePage() {
  return (
    <>
      <DemoNavigation />
      <main className="homepage-main">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title"> Landing Page Builder</h1>
            <p className="hero-subtitle">Build beautiful landing pages with drag and drop functionality</p>

            <div className="hero-buttons">
              <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/demo"
                  style={{
                    background: "white",
                    color: "#667eea",
                    padding: "1.25rem 2.5rem",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "1.125rem",
                    display: "inline-block",
                    textDecoration: "none",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.15)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  Try Drag & Drop Demo
                </Link>

                <Link
                  href="/landing/page-1"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    padding: "1.25rem 2.5rem",
                    borderRadius: "12px",
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    display: "inline-block",
                    textDecoration: "none",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
                  }}
                >
                  View Demo Pages
                </Link>
              </div>
            </div>

            {/* <div className="quick-guide">
              <h3 className="guide-title"> Quick Start Guide:</h3>
              <ol className="guide-list">
                <li>Click "Try Drag & Drop Demo" button above</li>
                <li>Drag components from left sidebar to right area</li>
                <li>Reorder using drag handles (⋮⋮)</li>
                <li>Use Undo/Redo buttons</li>
                <li>See your changes auto-save!</li>
              </ol>
            </div> */}
          </div>
        </div>
      </main>

      <style jsx>{`
        .homepage-main {
          padding-top: 4rem;
          min-height: 100vh;
          min-height: 100dvh;
        }

        .hero-section {
          min-height: calc(100vh - 4rem);
          min-height: calc(100dvh - 4rem);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .hero-content {
          max-width: 800px;
          width: 100%;
        }

        .hero-title {
          font-size: 4rem;
          margin-bottom: 1rem;
          font-weight: 700;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          line-height: 1.4;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .primary-button {
          background: white;
          color: #667eea;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.125rem;
          display: inline-block;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .secondary-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.125rem;
          display: inline-block;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .quick-guide {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          backdrop-filter: blur(10px);
        }

        .guide-title {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .guide-list {
          text-align: left;
          margin: 0;
          padding-left: 1.5rem;
          line-height: 1.6;
        }

        .guide-list li {
          margin-bottom: 0.5rem;
        }

        /* Tablet Styles */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1.25rem;
          }

          .primary-button,
          .secondary-button {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .hero-section {
            padding: 1.5rem 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
            margin-bottom: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            max-width: 280px;
            padding: 1rem 1.5rem;
            font-size: 0.9375rem;
          }

          .quick-guide {
            padding: 1.5rem;
            margin-top: 2rem;
          }

          .guide-title {
            font-size: 1.125rem;
          }

          .guide-list {
            font-size: 0.9375rem;
            padding-left: 1.25rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .hero-section {
            padding: 1rem 0.75rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .primary-button,
          .secondary-button {
            padding: 0.875rem 1.25rem;
            font-size: 0.875rem;
          }

          .quick-guide {
            padding: 1.25rem;
          }

          .guide-list {
            font-size: 0.875rem;
          }
        }

        /* Very Small Screens */
        @media (max-width: 320px) {
          .hero-title {
            font-size: 1.75rem;
          }

          .hero-subtitle {
            font-size: 0.9375rem;
          }

          .quick-guide {
            padding: 1rem;
          }
        }

        /* Landscape Mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          .hero-section {
            min-height: calc(100vh - 4rem);
            padding: 1rem;
          }

          .hero-title {
            font-size: 2rem;
            margin-bottom: 0.75rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .hero-buttons {
            margin-bottom: 1.5rem;
          }

          .quick-guide {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  )
}

