import React, { Component, useState } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Text, SearchBar } from 'react-native-elements'

const Notes = props => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleTextChange = search => {
    console.log(`Setting ${search} to the search term`)
    setSearchTerm(search)
  }

  return (
    <>
      <SearchBar
        placeholder='Search for notes...'
        onChangeText={handleTextChange}
        value={searchTerm}
      />
      <Text h2>Stored Notes</Text>
      <Text>
        This section will contain the actual notes obtained by GraphQL
      </Text>
    </>
  )
}
export default Notes
