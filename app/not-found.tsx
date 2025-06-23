// import Link from "next/link"
// import GlobalNavigation from "@/components/navigation/GlobalNavigation"

// export default function NotFound() {
//   return (
//     <>
//       <GlobalNavigation />
//       <main style={{ paddingTop: "4rem" }}>
//         <div
//           style={{
//             minHeight: "calc(100vh - 4rem)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             padding: "2rem",
//           }}
//         >
//           <div>
//             <h1 style={{ fontSize: "4rem", marginBottom: "1rem", color: "#ef4444" }}>404</h1>
//             <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#374151" }}>Page Not Found</h2>
//             <p style={{ fontSize: "1.125rem", marginBottom: "2rem", color: "#6b7280" }}>
//               The page you're looking for doesn't exist.
//             </p>
//             <Link
//               href="/"
//               style={{
//                 background: "#2563eb",
//                 color: "white",
//                 padding: "1rem 2rem",
//                 borderRadius: "8px",
//                 fontWeight: "600",
//                 display: "inline-block",
//               }}
//             >
//               Go Home
//             </Link>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

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

