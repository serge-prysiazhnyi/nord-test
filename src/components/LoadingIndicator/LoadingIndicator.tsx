import React from 'react'

const LoadingIndicator: React.FC = () => (
  <div
    role="progressbar"
    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
  />
)

export default LoadingIndicator
