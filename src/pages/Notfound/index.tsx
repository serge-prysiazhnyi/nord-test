import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../../components/Layout/Layout'
import Button from '../../components/Button/Button'

const Notfound: React.FC = memo(() => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center">404: Page Not Found</h1>
      <div className="flex justify-center items-center">
        <Button className="mt-3 mx-auto" onClick={handleGoBack} type="button">
          Go Back
        </Button>
      </div>
    </Layout>
  )
})

Notfound.displayName = 'Notfound'

export default Notfound
