import React from 'react'

interface ErrorMessageProps {
  message: string
  classNames?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, classNames }) => (
  <div
    role="alert"
    className={`text-red-600 my-2 font-semibold w-full text-center ${classNames}`}
  >
    {message}
  </div>
)

export default ErrorMessage
