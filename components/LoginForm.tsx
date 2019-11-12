import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/EvilIcons'

const LoginForm = props => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleLoginSubmit = async event => {
    let passwordObfuscated = ''
    for (let i = 0; i < password.length; i++) {
      passwordObfuscated += 'X'
    }
    console.log(
      'Login pressed, login:',
      email,
      ', password (obfuscated):',
      passwordObfuscated
    )
    console.log('logging in the user....')
    const token = await props.login({
      variables: { email, password }
    })

    console.log('token obtained on login', token.data.login.value)
    props.tokenChange(token.data.login.value)

    setEmail('')
    setPassword('')
  }

  return (
    <View style={{ backgroundColor: 'lightgrey', padding: 10 }}>
      <Text h2 style={{paddingBottom: 10}}>Login</Text>
      <Input
        label='Email'
        leftIcon={<Icon name='envelope' size={30} />}
        placeholder='Enter E-Mail...'
        onChangeText={email => setEmail(email)}
        value={email}
        clearButtonMode='always'
      />
      <Input
        label='Password'
        leftIcon={<Icon name='lock' size={30} />}
        placeholder='Enter password...'
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry={true}
        clearButtonMode='always'
      />
      <Button
        title='Login'
        onPress={handleLoginSubmit}
        buttonStyle={{
          backgroundColor: 'orange',
          marginTop: 10
        }}
      />
    </View>
  )
}
export default LoginForm
