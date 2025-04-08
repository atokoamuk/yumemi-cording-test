import React, { memo } from 'react'

interface Props {
  onClick: () => void
  children: React.ReactNode
}

function SimpleButton(props: Props) {
  const { onClick, children } = props
  return (
    <button
      className="bg-white hover:bg-gray-100 text-gray-800  py-1 px-2 border border-gray-400 rounded shadow"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default memo(SimpleButton)
