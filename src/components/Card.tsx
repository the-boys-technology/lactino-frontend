import React from 'react'
import '../css/card.css'

interface CardProps {
  title: string
  value?: string
  size?: 'small' | 'medium' | 'large'
  type?: 'inflow' | 'outflow'
  children?: React.ReactNode
  className?: string
}

const Card = ({ title, value, size, type, children, className }: CardProps) => {
    const valueClass = type
    ? `card__value card__value--${type}`
    : 'card__value'

    const cardClass = `card card--${size} ${className || ''}`

    return (
        <div className={cardClass}>
        <h3 className="card__title">{title}</h3>
        {value && <p className={valueClass}>{value}</p>}
        <div className="card__content">{children}</div>
        </div>
    )
}

export default Card