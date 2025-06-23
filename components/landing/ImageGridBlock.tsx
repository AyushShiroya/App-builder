"use client"

import Image from "next/image"
import { useState } from "react"
import type { ImageGridContent } from "@/types/contentful"
import styles from "./ImageGridBlock.module.css"

interface ImageGridBlockProps {
  content: ImageGridContent
}

export default function ImageGridBlock({ content }: ImageGridBlockProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }))
  }

  return (
    <section className={styles.imageGrid}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {content.images.map((image, index) => (
            <div key={image.sys.id} className={styles.imageWrapper}>
              {!imageErrors[image.sys.id] ? (
                <Image
                  src={image.url || `https://images.unsplash.com/photo-155${1000000 + index}?w=300&h=300&fit=crop`}
                  alt={image.title}
                  width={image.width || 300}
                  height={image.height || 300}
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                  onError={() => handleImageError(image.sys.id)}
                  unoptimized
                />
              ) : (
                <div
                  className={styles.fallbackImage}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
