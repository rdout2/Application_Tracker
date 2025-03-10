import './globals.css'
    import { Inter } from 'next/font/google'

    const inter = Inter({ subsets: ['latin'] })

    export const metadata = {
      title: 'Job Application Tracker',
      description: 'Track your job applications',
    }

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="en">
          <body className={inter.className}>
            {children}
          </body>
        </html>
      )
    }
