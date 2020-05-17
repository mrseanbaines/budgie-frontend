import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TextInput from 'components/text-input'
import { login } from 'store/auth/actions'
import { getIsAuthenticated } from 'store/auth/selectors'
import { getError } from 'store/errors/selectors'
import { LOGIN_FAIL } from 'store/auth/constants'
import { useFocusInput } from 'hooks'

import * as s from './login.styles'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const error = useSelector(getError)
  const inputRef = useFocusInput()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(login({ email, password }))
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <s.Wrapper>
      <s.Title>Log in</s.Title>

      <s.Form onSubmit={handleLogin}>
        <s.Fieldset>
          <s.Label htmlFor='email'>Email</s.Label>

          <TextInput
            ref={inputRef}
            id='email'
            name='email'
            type='email'
            value={email}
            placeholder='john@example.com'
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </s.Fieldset>

        <s.Fieldset>
          <s.Label htmlFor='password'>Password</s.Label>

          <TextInput
            id='password'
            type='password'
            name='password'
            value={password}
            placeholder='••••••••'
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </s.Fieldset>

        {error.id === LOGIN_FAIL && <s.FormError>{error.message}</s.FormError>}

        <s.Submit type='submit'>Log in</s.Submit>
      </s.Form>
    </s.Wrapper>
  )
}

export default Login
