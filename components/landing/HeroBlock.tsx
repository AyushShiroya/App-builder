"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { HeroBlockContent } from "@/types/contentful"
import styles from "./HeroBlock.module.css"

interface HeroBlockProps {
  content: HeroBlockContent
}

export default function HeroBlock({ content }: HeroBlockProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        {!imageError ? (
          <Image
            src={
              content.backgroundImage.url ||
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop"
            }
            alt={content.backgroundImage.title}
            fill
            priority
            className={styles.backgroundImage}
            sizes="100vw"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className={styles.fallbackBackground} />
        )}
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{content.heading}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <Link href={content.ctaUrl} className={styles.cta}>
            {content.ctaText}
          </Link>
        </div>
      </div>
    </section>
  )
}
