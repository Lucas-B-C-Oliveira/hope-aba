import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface Props {
  children?: ReactNode
}

export async function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <Header />

        <main id="main" className="h-full w-full bg-white px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
