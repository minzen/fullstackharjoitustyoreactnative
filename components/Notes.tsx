import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Text } from 'react-native-elements'

const Notes = props => {
  return (
    <>
      <Text h2>Stored Notes</Text>
      <Text>
        This section will contain the actual notes obtained by GraphQL
      </Text>
    </>
  )
}
export default Notes
