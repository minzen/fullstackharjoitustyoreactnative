import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import LoginForm from './LoginForm'
import ApolloClient from 'apollo-client'
import Loading from './Loading'

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`

type LoginProps = {
  client: any
  tokenChange: any
}

const Login = (props: LoginProps) => {
  useEffect(() => {
    login
  }, [])

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      console.log('Login onCompleted()', login)
      props.tokenChange(login)
    }
  })

  if (loading) return <Loading />
  if (error) return <div>Error</div>

  return <LoginForm login={login} />
}

export default Login
