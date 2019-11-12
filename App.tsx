import React, { Component, useState } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  AppRegistry,
  View,
  StatusBar,
  Platform,
  ImageBackground
} from 'react-native'
import { Button, ThemeProvider, Header, Text } from 'react-native-elements'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import Login from './components/Login'
import { ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-boost'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { APOLLO_URI } from 'react-native-dotenv'
import { colors, fonts, padding, dimensions } from './styles/base.js'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { AsyncStorage } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  }
})

const httpLink = createHttpLink({
  uri: APOLLO_URI
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from the AsyncStorage if it exists
  const token = await AsyncStorage.getItem('token')
  console.log('authLink, token', token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => {
  const [page, setPage] = useState('notes')
  const [token, setToken] = useState(null)

  const onTokenChange = async value => {
    console.log(
      'onTokenChange in App, storing token',
      value.toString(),
      'to AsyncStorage'
    )
    await AsyncStorage.setItem('token', value)
    setToken(value)
  }

  console.log('token value from AsyncStorage', token)
  // If not logged in, show only the login page
  if (!token) {
    return (
      <View style={styles.container}>
        <View
          // TODO: Landscape modus does not work with the status bar at the moment
          //To set the background color in IOS Status Bar also
          style={{
            //backgroundColor: '#00BCD4',
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
          }}
        >
          <StatusBar hidden={false} barStyle='dark-content' />
        </View>
        <ApolloProvider client={client}>
          <ImageBackground
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }}
            source={require('./assets/img/sofa_having_fresh_air.jpg')}
          >
            <Login show={true} client={client} tokenChange={onTokenChange} />
          </ImageBackground>
        </ApolloProvider>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View
          // TODO: Landscape modus does not work with the status bar at the moment
          //To set the background color in IOS Status Bar also
          style={{
            //backgroundColor: '#00BCD4',
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
          }}
        >
          <StatusBar hidden={false} barStyle='dark-content' />
        </View>
        <ApolloProvider client={client}>
          <Button
            buttonStyle={{ borderColor: 'black', borderWidth: 0.5 }}
            title='Notes'
            onPress={() => {
              setPage('notes')
            }}
          />
          <Button
            buttonStyle={{ borderColor: 'black', borderWidth: 0.5 }}
            title='Add Note'
            onPress={() => setPage('addnote')}
          />
          <Button
            buttonStyle={{
              backgroundColor: 'red',
              borderColor: 'black',
              borderWidth: 0.5
            }}
            title='Logout'
            onPress={() => {
              console.log('Logging out the user')
              AsyncStorage.clear()
              client.resetStore()
              setToken(null)
            }}
          />

          <ImageBackground
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }}
            source={require('./assets/img/sofa_having_fresh_air.jpg')}
          >
            <Notes show={page === 'notes'} client={client} />
            <AddNote show={page === 'addnote'} client={client} />
            <Login
              show={page === 'login'}
              client={client}
              tokenChange={onTokenChange}
            />
          </ImageBackground>
        </ApolloProvider>
      </View>
    )
  }
}
export default App
