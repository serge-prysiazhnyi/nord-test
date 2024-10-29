import React from 'react'

import Logo from '../Logo/Logo'
import Logout from '../Logout/Logout'

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-3 bg-slate-100 mb-3">
      <Logo classNames="w-8 h-8" />
      <Logout />
    </header>
  )
}

export default Header
