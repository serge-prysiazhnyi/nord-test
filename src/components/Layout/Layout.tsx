import { PropsWithChildren } from 'react'

import Header from '../Header/Header'

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <div className="w-full max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8">
      {children}
    </div>
  </>
)

export default Layout
