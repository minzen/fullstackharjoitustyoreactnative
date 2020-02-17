import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import LoginForm from './LoginForm'

const Login = ({ show, client, tokenChange }) => {
  if (!show) {
    return null
  }

  const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        value
      }
    }
  `

  return (
    <Mutation mutation={LOGIN_USER}>
      {loginUser => <LoginForm login={loginUser} tokenChange={tokenChange} />}
    </Mutation>
  )
}
export default Login
