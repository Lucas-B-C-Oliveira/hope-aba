'use client'

// import { useRouter } from 'next/navigation'
// import { useEffect, useRef, useState } from 'react'
import { ModalComponent } from './ModalComponent'

// export default function PhotoModal({ params }: { params: { slug: string[] } }) {
//   console.log('slug', params)
//   const [id, posX, posY] = params.slug

//   const router = useRouter()
//   return (
//     <div className="relative bg-slate-500">
//       <h1 className="text-yellow-600 text-lg">Estou no Modal</h1>
//       <h1 className="text-yellow-600 text-lg">{id}</h1>
//       <span onClick={() => router.back()}>Close modal</span>
//     </div>
//   )
// }

// export default function Modal({ params }) {
//   const modalRef = useRef(null)
//   const [modalHeight, setModalHeight] = useState(0)
//   const { id, x, y } = params
//   console.log('params', params)

//   console.log('modalHeight', modalHeight)

//   const router = useRouter()

//   useEffect(() => {
//     if (modalRef.current) {
//       const height = modalRef.current.offsetHeight
//       setModalHeight(height)
//     }
//   }, [])

//   return (
//     <div
//       ref={modalRef}
//       style={{
//         position: 'absolute',
//         left: `${x}px`,
//         top: `${y - modalHeight}px`,
//       }}
//       className=" bg-slate-500"
//     >
//       <h1 className="text-yellow-600 text-lg">Estou no Modal</h1>
//       {/* <h1 className="text-yellow-600 text-lg">{params.id}</h1> */}
//       <h1 className="text-yellow-600 text-lg">{id}</h1>
//       <span onClick={() => router.back()}>Close modal</span>
//     </div>
//   )
// }

export default function Modal({ params }: any) {
  const { id, x, y } = params

  function setOpen(value = true) {
    return true
  }

  return (
    <ModalComponent open={true} setOpen={setOpen}>
      <div className="flex flex-col gap-5">
        <h1 className="text-sky-950 text-3xl">ESTOU No MODAL</h1>
        <h1 className="text-sky-400 text-lg">id: {id}</h1>
        <h1 className="text-sky-600 text-lg">ix: {x}</h1>
        <h1 className="text-sky-900 text-lg">y: {y}</h1>
      </div>
    </ModalComponent>
  )
}
