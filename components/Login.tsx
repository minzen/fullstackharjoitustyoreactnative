import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import LoginForm from './LoginForm'
import ApolloClient from 'apollo-client'
import Loading from './Loading'
import { AsyncStorage } from 'react-native'

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      value
    }
  }
`

const Login = ({ show, client, tokenChange }) => {
  if (!show) {
    return null
  }

  useEffect(() => {
    console.log('useEffect')
    login
  }, [])

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      console.log('Login onCompleted()', login)
      tokenChange(login)
    }
  })

  if (loading) return <Loading />
  if (error) return <div>Error</div>

  return <LoginForm login={login} client={client} />
}

export default Login
