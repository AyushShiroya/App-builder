import { GraphQLClient } from "graphql-request"

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

export const contentfulClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
})

export const GET_LANDING_PAGE = `
  query GetLandingPage($slug: String!) {
    landingPageCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        title
        slug
        layoutConfig
        seoTitle
        seoDescription
      }
    }
  }
`

export const GET_ALL_LANDING_PAGES = `
  query GetAllLandingPages {
    landingPageCollection {
      items {
        slug
      }
    }
  }
`

export async function getLandingPage(slug: string) {
  // Return null if Contentful is not configured
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.log("Contentful not configured")
    return null
  }

  try {
    const data = await contentfulClient.request(GET_LANDING_PAGE, { slug })
    return data.landingPageCollection.items[0] || null
  } catch (error) {
    console.error("Error fetching landing page:", error)
    return null
  }
}

export async function getAllLandingPages() {
  // Return empty array if Contentful is not configured
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.log("Contentful not configured")
    return []
  }

  try {
    const data = await contentfulClient.request(GET_ALL_LANDING_PAGES)
    return data.landingPageCollection.items
  } catch (error) {
    console.error("Error fetching landing pages:", error)
    return []
  }
}
