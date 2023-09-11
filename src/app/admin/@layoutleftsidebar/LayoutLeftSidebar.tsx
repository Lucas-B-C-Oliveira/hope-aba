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

const navigation = [
  { name: 'Agendamentos', href: '/admin/appointments', icon: CalendarIcon },
  { name: 'Pacientes', href: '/admin/patients', icon: UsersIcon },
  { name: 'Profissionais', href: '/admin/professionals', icon: UserIcon },
  { name: 'Salas', href: '/admin/rooms', icon: HomeIcon },
]

export function LayoutLeftSidebar() {
  const { sidebarIsOpen, openAndCloseSidebar } = useMainLayoutStore()

  // console.log('sidebarIsOpen', sidebarIsOpen)

  return (
    <div
      id="main-sidebar"
      className="z-40 lg:flex lg:w-fit lg:flex-col h-screen"
    >
      <div className="flex flex-col gap-y-5 overflow-y-auto bg-gray-900 h-full px-2 pb-4">
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
              navigation.map((item) => (
                <LinkNav key={item.name} href={item.href}>
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {sidebarIsOpen && item.name}
                </LinkNav>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
