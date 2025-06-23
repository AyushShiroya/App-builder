"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./DemoNavigation.module.css"

export default function DemoNavigation() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Landing Builder
        </Link>
        <div className={styles.links}>
          <Link
            href="/demo"
            className={`${styles.link} ${pathname === "/demo" ? styles.active : ""} ${styles.highlight}`}
          >
            Builder App
          </Link>
          <Link
            href="/landing/page-1"
            className={`${styles.link} ${pathname === "/landing/page-1" ? styles.active : ""}`}
          >
            Page 1
          </Link>
          <Link
            href="/landing/page-2"
            className={`${styles.link} ${pathname === "/landing/page-2" ? styles.active : ""}`}
          >
            Page 2
          </Link>
        </div>
      </div>
    </nav>
  )
}
