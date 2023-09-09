'use client'

import {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  memo,
  useCallback,
  useState,
} from 'react'
import { Content } from './Content'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  openModalButton: ReactElement
  children?: ReactNode
  childrenThatCanSetOpenModal?: ReactElement
  withoutMask?: boolean
}

export const Container = memo(function Container({
  openModalButton,
  children,
  childrenThatCanSetOpenModal,
}: ContainerProps) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)

  const memoizedSetIsModalOpen = useCallback((value: boolean) => {
    setIsPopUpOpen(value)
  }, [])

  return (
    <>
      {cloneElement(openModalButton, {
        onClick: () => memoizedSetIsModalOpen(true),
      })}

      <Content open={isPopUpOpen} setOpen={memoizedSetIsModalOpen}>
        {children}

        {childrenThatCanSetOpenModal &&
          cloneElement(childrenThatCanSetOpenModal, {
            setOpen: memoizedSetIsModalOpen,
          })}
      </Content>
    </>
  )
})
