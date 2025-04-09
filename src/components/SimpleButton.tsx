import React, { memo } from 'react'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

function SimpleButton(props: Props) {
  const { onClick, children, ...buttonProps } = props
  return (
    <button
      {...buttonProps}
      className={`bg-white
         hover:bg-gray-100
          text-gray-800 
          py-1 
          px-2 
          border 
          border-gray-400 
          rounded 
          shadow
          ${props.className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default memo(SimpleButton)
