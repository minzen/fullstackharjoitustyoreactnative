import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import LoginForm from './LoginForm'

const Login = ({ show, client }) => {
  if (!show) {
    return null
  }

  const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
  `

  return (
    <Mutation mutation={LOGIN_USER}>
      {loginUser => <LoginForm login={loginUser} />}
    </Mutation>
  )
}
export default Login
