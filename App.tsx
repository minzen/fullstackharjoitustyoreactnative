import React, { Component, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView, AppRegistry } from 'react-native'
import { Button, ThemeProvider, Header, Text } from 'react-native-elements'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import Login from './components/Login'
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

// TODO: Read this from a configuration
const client = new ApolloClient({
  uri: 'http://10.20.144.18:4000/graphql'
})

const App = () => {
  const [page, setPage] = useState('notes')

  return (
    <ApolloProvider client={client}>
      <Text></Text>

      <Button
        buttonStyle={{ backgroundColor: 'grey' }}
        title='Notes'
        onPress={() => {
          setPage('notes')
        }}
      />
      <Button
        buttonStyle={{ backgroundColor: 'grey' }}
        title='Add Note'
        onPress={() => setPage('addnote')}
      />
      <Button
        buttonStyle={{ backgroundColor: 'green' }}
        title='Login'
        onPress={() => setPage('login')}
      />

      <Notes show={page === 'notes'} client={client} />
      <AddNote show={page === 'addnote'} client={client} />
      <Login show={page === 'login'} client={client} />
    </ApolloProvider>
  )
}
export default App
