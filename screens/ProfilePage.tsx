import React from 'react'
import { View } from 'react-native'
import { Text, Card, Avatar, Button } from 'react-native-elements'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    email
    givenname
    surname
  }
`

const CURRENT_USER = gql`
  query {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`

const ProfilePage = ({ client, setToken }) => {
  const { loading, data, error } = useQuery(CURRENT_USER)
  let user

  if (loading || error) {
    return null
  }

  if (data && data.me) {
    user = data.me
  }

  return (
    <View>
      <Card title='User profile'>
        <Avatar rounded icon={{ name: 'face' }} />
        <Text>Givenname: {user.givenname}</Text>
        <Text>Surname: {user.surname}</Text>
        <Text>Email: {user.email}</Text>
      </Card>
      <Button
        buttonStyle={{
          backgroundColor: 'red',
          borderColor: 'black',
          borderWidth: 0.5
        }}
        title='Logout'
        onPress={() => {
          client.resetStore()
          setToken(null)
        }}
      />
    </View>
  )
}
export default ProfilePage
