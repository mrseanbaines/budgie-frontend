import React, { useState } from 'react'
import ky from 'ky'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import TextInput from 'components/text-input'
import { setIsLoggedIn, setUser } from 'store/user/actions'
import { getUser } from 'store/user/selectors'
import { User } from 'store/user/types'
import { useFocusInput } from 'hooks'

import * as s from './login.styles'

const Login: React.FC = () => {
  const [formError, setFormError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(getUser)

  const inputRef = useFocusInput()

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    const { REACT_APP_API_URL } = process.env
    e.preventDefault()

    interface Response {
      token: string | null
      user: User | null
      error: string | null
    }

    const { user, error } = await ky
      .post(`${REACT_APP_API_URL}/auth`, {
        json: { email, password },
        credentials: 'include',
        throwHttpErrors: false,
      })
      .json<Response>()

    console.log({ user, error })

    if (error) {
      setFormError(error)
    } else if (user) {
      dispatch(setIsLoggedIn(true))
      dispatch(setUser(user))
    }
  }

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <s.Wrapper>
      <s.Title>Log in</s.Title>

      <s.Form onSubmit={login}>
        <s.Fieldset>
          <s.Label htmlFor='email'>Email</s.Label>

          <TextInput
            ref={inputRef}
            id='email'
            name='email'
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

        {formError && <s.FormError>{formError}</s.FormError>}

        <s.Submit type='submit'>Log in</s.Submit>
      </s.Form>
    </s.Wrapper>
  )
}

export default Login
