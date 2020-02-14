import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  AppRegistry,
  View,
  StatusBar,
  Platform,
  ImageBackground
} from 'react-native'
import { ThemeProvider, Header } from 'react-native-elements'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import LoginScreen from './views/LoginScreen'
import HomeScreen from './views/HomeScreen'
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
import {
  ApplicationProvider,
  Layout,
  Text,
  Button
} from '@ui-kitten/components'
import { mapping, dark as darkTheme } from '@eva-design/eva'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  button: {
    margin: 1
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

  useEffect(() => {
    setToken(AsyncStorage.getItem('token'))
  }, [])

  const onTokenChange = async value => {
    console.log(
      'onTokenChange in App, storing token',
      value.toString(),
      'to AsyncStorage'
    )
    await AsyncStorage.setItem('token', value)
    // setToken(value)
  }

  console.log('token value from AsyncStorage', token)
  // If not logged in, show only the login page
  if (!token) {
    return (
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
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
              <LoginScreen
                show={true}
                client={client}
                tokenChange={onTokenChange}
              />
            </ImageBackground>
          </ApolloProvider>
        </View>
      </ApplicationProvider>
    )
  } else {
    return (
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
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
              style={styles.button}
              onPress={() => {
                setPage('home')
              }}
            >
              Home
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                setPage('notes')
              }}
            >
              Notes
            </Button>
            <Button style={styles.button} onPress={() => setPage('addnote')}>
              Add note
            </Button>
            <Button
              style={styles.button}
              status='danger'
              onPress={() => {
                AsyncStorage.clear()
                client.resetStore()
                setToken(null)
              }}
            >
              Logout
            </Button>

            <ImageBackground
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: undefined,
                height: undefined
              }}
              source={require('./assets/img/sofa_having_fresh_air.jpg')}
            >
              <HomeScreen show={page === 'home'} client={client} />
              <Notes show={page === 'notes'} client={client} />
              <AddNote show={page === 'addnote'} client={client} />
              <LoginScreen
                show={page === 'login'}
                client={client}
                tokenChange={onTokenChange}
              />
            </ImageBackground>
          </ApolloProvider>
        </View>
      </ApplicationProvider>
    )
  }
}
export default App
