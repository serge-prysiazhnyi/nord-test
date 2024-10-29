import { memo } from 'react'

import LoginFormContainer from '../../components/LoginFormContainer/LoginFormContainer'

const Login: React.FC = memo(() => {
  return (
    <div className="flex justify-center items-center flex-col p-5 h-full">
      <h1 className="text-3xl font-bold text-center mb-3">Please login</h1>
      <LoginFormContainer />
    </div>
  )
})

Login.displayName = 'Login'

export default Login
