import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, View, StatusBar, Platform } from 'react-native'
import Login from './components/Login'
import { ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { AsyncStorage } from 'react-native'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd'
  }
})

const APOLLOSERVER_URI = 'http://10.20.144.15:4000/graphql'

const httpLink = createHttpLink({
  uri: APOLLOSERVER_URI
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

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(AsyncStorage.getItem('token').toString())
  }, [])

  const onTokenChange = async (value: string) => {
    console.log(
      'onTokenChange in App, storing token',
      value.toString(),
      'to AsyncStorage'
    )
    setToken(value)
  }

  // If not logged in, show only the login page
  if (!token) {
    return (
      <NavigationContainer>
        <View style={styles.container}>
          <Header />
          <View
            style={{
              height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
            }}
          >
            <StatusBar hidden={false} barStyle='dark-content' />
          </View>
          <ApolloProvider client={client}>
            <Login client={client} tokenChange={onTokenChange} />
          </ApolloProvider>
        </View>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <View
          style={{
            height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
          }}
        >
          <StatusBar hidden={false} barStyle='dark-content' />
        </View>
        <TabNavigation client={client} setToken={setToken} />
      </ApolloProvider>
    </NavigationContainer>
  )
}
export default App
