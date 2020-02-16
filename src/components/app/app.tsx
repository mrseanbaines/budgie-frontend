import React from 'react'
import { Button } from 'antd'

const App: React.FC = () => {
  const { REACT_APP_API_URL = '' } = process.env

  return (
    <Button type='primary' href={`${REACT_APP_API_URL}/auth/login`}>
      Login
    </Button>
  )
}

export default App
