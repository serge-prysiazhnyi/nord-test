import { memo } from 'react'

import Layout from '../../components/Layout/Layout'
import ServersListContainer from '../../components/ServersListContainer/ServersListContainer'

const Home: React.FC = memo(() => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center">Servers</h1>
      <ServersListContainer />
    </Layout>
  )
})

Home.displayName = 'Home'

export default Home
