import { OpenModalButton } from '@/components/OpenModalButton'
import { Calendar } from '..'
import { useToolbar } from './useToolbar'

export function Toolbar(props: any) {
  const {
    openAndCloseRightContentSidebar,
    rightContentSidebarIsOpen,
    leftContentSidebarIsOpen,
    openAndCloseLeftContentSidebar,
  } = useToolbar()

  function openAndCloseRightContentSidebarHandle() {
    openAndCloseRightContentSidebar(!rightContentSidebarIsOpen)
  }

  function openAndCloseLeftContentSidebarHandle() {
    openAndCloseLeftContentSidebar(!leftContentSidebarIsOpen)
  }

  return (
    <>
      <Calendar.Header
        openLeftContentSidebarButton={
          <OpenModalButton onClick={openAndCloseLeftContentSidebarHandle}>
            {!leftContentSidebarIsOpen && 'Filtros'}
            {leftContentSidebarIsOpen && 'Fechar'}
          </OpenModalButton>
        }
        calendarDate={props.date}
        onNavigatePrev={() => props.onNavigate('PREV')}
        onNavigateNext={() => props.onNavigate('NEXT')}
        onNavigateToday={() => props.onNavigate('TODAY')}
        openRightContentSidebarButton={
          <OpenModalButton onClick={openAndCloseRightContentSidebarHandle}>
            {!rightContentSidebarIsOpen && 'Agendar'}
            {rightContentSidebarIsOpen && 'Fechar'}
          </OpenModalButton>
        }
      />
    </>
  )
}
