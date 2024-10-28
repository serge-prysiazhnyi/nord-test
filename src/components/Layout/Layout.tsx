import { PropsWithChildren } from 'react'

import Header from '../Header/Header'

const Layout = ({ children }: PropsWithChildren) => (
  <div>
    <Header />
    <div>{children}</div>
  </div>
)

export default Layout
