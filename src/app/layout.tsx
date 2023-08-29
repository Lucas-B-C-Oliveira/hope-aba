import { Providers } from '@/components/Providers'
import '@/style/globals.css'
import { ReactNode } from 'react'
// import { LayoutLeftSidebar } from './@layoutleftsidebar/LayoutLeftSidebar'
// import { LayoutHeader } from './@layoutheader/LayoutHeader'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

interface RootLayoutProps {
  layoutleftsidebar: ReactNode
  layoutheader: ReactNode
  children: ReactNode
}


export default async function RootLayout({
  children,
  layoutleftsidebar,
  layoutheader,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <Providers>
        <body className="w-screen h-screen bg-white flex flex-row">
          <aside className="z-50 w-fit h-fit">{layoutleftsidebar}</aside>

          <div className="flex flex-col w-full h-full">
            <header>{layoutheader}</header>

            <main id="main" className="h-full w-full bg-white flex flex-row">
              {children}
            </main>
          </div>
        </body>
      </Providers>
    </html>
  )
}
