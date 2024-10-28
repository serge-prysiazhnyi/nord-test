import { memo } from 'react'

import Layout from '../../components/Layout/Layout'
import ServersListContainer from '../../components/ServersListContainer/ServersListContainer'

const Index: React.FC = memo(() => {
  return (
    <Layout>
      <h1>Hello</h1>
      <ServersListContainer />
    </Layout>
  )
})

Index.displayName = 'Index'

export default Index
