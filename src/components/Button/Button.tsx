import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  const classNames = `text-white bg-blue-700 hover:bg-blue-800 
    focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium 
    rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 
    dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-400 cursor-pointer ${className}`

  return (
    <button className={`${classNames}`} {...props}>
      {children}
    </button>
  )
}

export default Button
