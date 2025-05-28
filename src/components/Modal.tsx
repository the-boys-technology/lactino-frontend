import React from 'react'
import '../css/modal.css'

interface ModalProps {
  titulo: string
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ titulo, children, onClose }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__container">
        <div className="modal__header">
          <h2 className="modal__title">{titulo}</h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>
  )
}
