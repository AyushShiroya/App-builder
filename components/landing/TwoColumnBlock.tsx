"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { TwoColumnContent } from "@/types/contentful"
import styles from "./TwoColumnBlock.module.css"

interface TwoColumnBlockProps {
  content: TwoColumnContent
}

export default function TwoColumnBlock({ content }: TwoColumnBlockProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <section className={styles.twoColumn}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>{content.heading}</h2>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <Link href={content.ctaUrl} className={styles.cta}>
            {content.ctaText}
          </Link>
        </div>
        <div className={styles.imageWrapper}>
          {!imageError ? (
            <Image
              src={
                content.image.url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
              }
              alt={content.image.title}
              width={content.image.width || 600}
              height={content.image.height || 400}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className={styles.fallbackImage} />
          )}
        </div>
      </div>
    </section>
  )
}
