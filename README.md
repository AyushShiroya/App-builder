# Landing Page Builder

A full-stack application that enables editors to visually arrange components for landing pages using drag-and-drop functionality. Built with Next.js, TypeScript, Redux, and Contentful.

## 🚀 Features

- **Drag & Drop Interface**: Visual component arrangement in Contentful
- **Component Library**: Hero blocks, two-column layouts, and image grids
- **State Management**: Redux with undo/redo and auto-save functionality
- **Static Site Generation**: Optimized Next.js pages with SSG
- **Performance Optimized**: Next.js Image optimization and Lighthouse scores ≥90
- **SEO Ready**: Dynamic metadata and JSON-LD structured data

## 🛠 Tech Stack

- **Frontend**: Next.js 15.3+ (App Router), TypeScript, React
- **State Management**: Redux Toolkit, Redux Persist
- **CMS**: Contentful with GraphQL API
- **Styling**: CSS Modules (no external UI libraries)
- **Deployment**: Vercel
- **Version Control**: GitHub with proper tagging

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd contentful-landing-builder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Contentful credentials:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
   - `CONTENTFUL_MANAGEMENT_TOKEN`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🏗 Contentful Setup

### Content Models

Create the following content models in your Contentful space:

#### Landing Page
- **Title** (Short text)
- **Slug** (Short text, unique)
- **Layout Config** (JSON object)
- **SEO Title** (Short text, optional)
- **SEO Description** (Long text, optional)

### Contentful App Installation

1. Navigate to your Contentful space
2. Go to Apps → Manage apps
3. Create a new app with the following settings:
   - **Name**: Landing Page Builder
   - **Frontend**: `https://your-vercel-url.vercel.app/contentful-app`
   - **Locations**: Entry editor (fullscreen)

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   \`\`\`bash
   vercel --prod
   \`\`\`

2. **Set environment variables in Vercel dashboard**
   - Add all Contentful environment variables
   - Set `NEXT_PUBLIC_VERCEL_URL` to your deployment URL

3. **Tag the release**
   \`\`\`bash
   git tag v1.0.0
   git push origin v1.0.0
   \`\`\`

## 📱 Usage

### Building Pages in Contentful

1. Open a Landing Page entry in Contentful
2. Click the "Landing Page Builder" app
3. Drag components from the sidebar to the layout area
4. Reorder components by dragging within the layout
5. Use Undo/Redo buttons for state management
6. Changes are auto-saved after a 2-second delay

### Available Components

- **Hero Block**: Full-width section with heading, subtitle, CTA, and background image
- **Two Column Row**: Left column (text + CTA) and right column (image)
- **2x2 Image Grid**: Grid of four optimized images

### Frontend Pages

- `/landing/page-1` - First landing page
- `/landing/page-2` - Second landing page

## 🧪 Testing

Run the test suite:
\`\`\`bash
npm test
\`\`\`

Run tests in watch mode:
\`\`\`bash
npm run test:watch
\`\`\`

## 📊 Performance

The application is optimized for:
- **Lighthouse Performance**: ≥90
- **Lighthouse SEO**: ≥90  
- **Lighthouse Accessibility**: ≥90

Key optimizations:
- Next.js Image component for all images
- Static Site Generation (SSG)
- CSS Modules for efficient styling
- Proper semantic HTML and ARIA attributes

## 🔧 Development

### Project Structure

\`\`\`
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── contentful-app/   # Contentful App components
│   ├── landing/          # Landing page components
│   └── navigation/       # Navigation components
├── lib/                  # Utilities and API clients
├── store/               # Redux store and slices
├── types/               # TypeScript type definitions
└── public/              # Static assets
\`\`\`

### Key Files

- `components/contentful-app/DragDropBuilder.tsx` - Main drag & drop interface
- `store/dragDropSlice.ts` - Redux state management
- `lib/contentful.ts` - Contentful GraphQL client
- `app/landing/[slug]/page.tsx` - Dynamic landing pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
\`\`\`

This is a complete, production-ready implementation of the Contentful Landing Page Builder with all the specified requirements:

✅ **Contentful App**: Fullscreen drag-and-drop interface with Redux state management
✅ **Next.js Frontend**: SSG pages with App Router
✅ **Performance**: Optimized images and SEO-ready
✅ **TypeScript**: Fully typed throughout
✅ **CSS Modules**: No external UI libraries
✅ **Redux Features**: Undo/redo, auto-save, persistence
✅ **Structured Data**: JSON-LD implementation
✅ **Responsive Design**: Mobile-friendly layouts
