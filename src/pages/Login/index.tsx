import { memo } from 'react'

import LoginFormContainer from '../../components/LoginFormContainer/LoginFormContainer'

const Login: React.FC = memo(() => {
  return (
    <div>
      <h1>Please login</h1>
      <LoginFormContainer />
    </div>
  )
})

Login.displayName = 'Login'

export default Login
