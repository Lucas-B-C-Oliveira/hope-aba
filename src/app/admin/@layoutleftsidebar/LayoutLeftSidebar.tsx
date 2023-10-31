'use client'
import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  UserIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { LinkNav } from '@/components/LinkNav'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import logo from '@/assets/hopeAbaLogo.png'
import Image from 'next/image'

const navigation = [
  { name: 'Agendamentos', href: '/admin/appointments', icon: CalendarIcon },
  { name: 'Pacientes', href: '/admin/patients', icon: UsersIcon },
  { name: 'Profissionais', href: '/admin/professionals', icon: UserIcon },
  { name: 'Salas', href: '/admin/rooms', icon: HomeIcon },
]

interface Props {
  tokenData: any
}

export function LayoutLeftSidebar({ tokenData }: Props) {
  const { sidebarIsOpen, openAndCloseSidebar } = useMainLayoutStore()

  return (
    <div
      id="main-sidebar"
      className="z-40 lg:flex lg:w-fit lg:flex-col h-screen"
    >
      <div className="flex flex-col gap-y-5 overflow-y-auto bg-gray-900 h-full px-2 pb-4 rounded-tr-lg rounded-br-lg">
        <div className="flex h-16 shrink-0 items-center px-2">
          <button onClick={() => openAndCloseSidebar(!sidebarIsOpen)}>
            {sidebarIsOpen && (
              <ChevronDoubleLeftIcon
                className="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
            )}
            {!sidebarIsOpen && (
              <ChevronDoubleRightIcon
                className="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
        <nav className="flex flex-1 flex-col ">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {navigation.length > 0 &&
              navigation.map((item) => {
                if (
                  tokenData?.role === 'professional' &&
                  item.name !== 'Agendamentos'
                )
                  return null

                return (
                  <LinkNav key={item.name} href={item.href}>
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {sidebarIsOpen && item.name}
                  </LinkNav>
                )
              })}
          </ul>
        </nav>

        {sidebarIsOpen && (
          <div className="flex w-full h-fit justify-center">
            <Image alt="logo" width={80} height={80} src={logo} />
          </div>
        )}

        {!sidebarIsOpen && (
          <div className="flex w-full h-fit justify-center">
            <Image alt="logo" width={40} height={40} src={logo} />
          </div>
        )}
      </div>
    </div>
  )
}
