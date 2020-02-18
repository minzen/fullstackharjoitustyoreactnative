import React from 'react'
import { Text, Card, Avatar } from 'react-native-elements'
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

const Profile = ({ show, token }) => {
    if (!show || !token ) {
        return null
    }
    const { loading, data, error } = useQuery(CURRENT_USER)
    let user

    if (loading || error) {
        return null
    }

    if (data && data.me) {
        user = data.me
    }


    return (
        <Card title='User profile'>
            <Avatar rounded icon={{ name: 'face' }} />
            <Text>Givenname: {user.givenname}</Text>
            <Text>Surname: {user.surname}</Text>
            <Text>Email: {user.email}</Text>
        </Card>
    )
}
export default Profile