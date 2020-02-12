import React from 'react'

const App: React.FC = () => {
  const { REACT_APP_API_URL = '' } = process.env

  return <a href={`${REACT_APP_API_URL}/auth/login`}>Login</a>
}

export default App
