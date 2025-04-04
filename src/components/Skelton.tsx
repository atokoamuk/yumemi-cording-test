import React from 'react'

interface SkeletonProps {
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={`w-full h-full animate-pulse bg-gray-300 rounded ${className}`}></div>
}

export default Skeleton
