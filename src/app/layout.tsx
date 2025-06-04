import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@vercel/analytics/next'

// Metadata for the application (title and description for SEO)
export const metadata: Metadata = {
  title: 'AI Model Matcher',
  description: 'Najděte vhodný AI model pro vaši úlohu.',
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      // Set language and force dark mode for the app
      <html lang='cs' className='dark'>
          <head>
              {/* Preconnect to Google Fonts for performance */}
              <link rel='preconnect' href='https://fonts.googleapis.com' />
              <link
                  rel='preconnect'
                  href='https://fonts.gstatic.com'
                  crossOrigin='anonymous'
              />
              {/* Import Inter font family */}
              <link
                  href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
                  rel='stylesheet'
              />
          </head>
          {/* Main body with global font and antialiasing */}
          <body className='font-body antialiased'>
              {/* Render all page content */}
              {children}
              {/* Toast notifications (global) */}
              <Toaster />
              {/* Vercel Analytics for usage tracking */}
              <Analytics />
          </body>
      </html>
  )
}
