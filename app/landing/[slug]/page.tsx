
import type { Metadata } from "next"
import { getLandingPage } from "@/lib/contentful"
import { getLayout as getStoredLayout } from "@/lib/layoutStorage"
import ClientLandingPageComponent from "@/components/ClientLandingPage"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const fallbackPages = {
  "page-1": {
    sys: { id: "page-1" },
    title: "Landing Page 1",
    slug: "page-1",
    seoTitle: "Beautiful Landing Page 1",
    seoDescription: "A stunning landing page built with our drag and drop builder",
    layoutConfig: {
      components: [
        {
          id: "hero-1",
          type: "hero" as const,
          content: {
            heading: "Welcome to Our Amazing Platform",
            subtitle: "Build beautiful landing pages with our intuitive drag and drop interface",
            ctaText: "Get Started Today",
            ctaUrl: "#",
            backgroundImage: {
              sys: { id: "hero-bg" },
              title: "Hero Background",
              url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
              width: 1200,
              height: 600,
            },
          },
        },
        {
          id: "two-column-1",
          type: "twoColumn" as const,
          content: {
            heading: "Powerful Features",
            subtitle:
              "Our platform provides everything you need to create stunning landing pages that convert visitors into customers.",
            ctaText: "Learn More",
            ctaUrl: "#",
            image: {
              sys: { id: "feature-img" },
              title: "Features Image",
              url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
              width: 600,
              height: 400,
            },
          },
        },
      ],
    },
  },
  "page-2": {
    sys: { id: "page-2" },
    title: "Landing Page 2",
    slug: "page-2",
    seoTitle: "Stunning Landing Page 2",
    seoDescription: "Another beautiful landing page showcasing our builder capabilities",
    layoutConfig: {
      components: [
        {
          id: "two-column-2",
          type: "twoColumn" as const,
          content: {
            heading: "Start Your Journey",
            subtitle: "Join thousands of satisfied customers who have transformed their business with our platform.",
            ctaText: "Join Now",
            ctaUrl: "#",
            image: {
              sys: { id: "journey-img" },
              title: "Journey Image",
              url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
              width: 600,
              height: 400,
            },
          },
        },
        {
          id: "hero-2",
          type: "hero" as const,
          content: {
            heading: "Transform Your Business Today",
            subtitle: "Experience the power of professional landing pages that drive results",
            ctaText: "Start Free Trial",
            ctaUrl: "#",
            backgroundImage: {
              sys: { id: "hero-bg-2" },
              title: "Hero Background 2",
              url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
              width: 1200,
              height: 600,
            },
          },
        },
      ],
    },
  },
}

export async function generateStaticParams() {
  return [{ slug: "page-1" }, { slug: "page-2" }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  let page = null

  try {
    page = await getLandingPage(slug)
  } catch (error) {
    console.error("Error fetching landing page from Contentful:", error)
  }

  if (!page) {
    const savedLayout = getStoredLayout(slug)
    if (savedLayout) {
      page = {
        sys: { id: slug },
        title: savedLayout.name,
        slug: slug,
        seoTitle: savedLayout.name,
        seoDescription: `A landing page built with our drag and drop builder`,
        layoutConfig: { components: savedLayout.components },
      }
    }
  }

  if (!page && fallbackPages[slug as keyof typeof fallbackPages]) {
    page = fallbackPages[slug as keyof typeof fallbackPages]
  }

  if (!page) {
    return {
      title: "Page Not Found",
    }
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription,
      type: "website",
    },
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params
  return <ClientLandingPageComponent slug={slug} />
}
