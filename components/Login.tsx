import React from 'react'
import { Text } from 'react-native-elements'

const Login = ({ show, client }) => {
  if (!show) {
    return null
  }
  return <Text h1>Login</Text>
}
export default Login
