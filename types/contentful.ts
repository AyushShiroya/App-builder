export interface ContentfulAsset {
  sys: {
    id: string
  }
  title: string
  description?: string
  url: string
  width?: number
  height?: number
}

export interface HeroBlockContent {
  heading: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  backgroundImage: ContentfulAsset
}

export interface TwoColumnContent {
  heading: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  image: ContentfulAsset
}

export interface ImageGridContent {
  images: ContentfulAsset[]
}

export interface ComponentConfig {
  id: string
  type: "hero" | "twoColumn" | "imageGrid"
  content: HeroBlockContent | TwoColumnContent | ImageGridContent
}

export interface LayoutConfig {
  components: ComponentConfig[]
}

export interface LandingPage {
  sys: {
    id: string
  }
  title: string
  slug: string
  layoutConfig: LayoutConfig
  seoTitle?: string
  seoDescription?: string
}
