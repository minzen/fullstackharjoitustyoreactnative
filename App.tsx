import 'react-native-gesture-handler'
import React, { Component, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  StyleSheet,
  KeyboardAvoidingView,
  AppRegistry,
  View,
  StatusBar,
  Platform
} from 'react-native'
import { Button, ThemeProvider, Text } from 'react-native-elements'
import Login from './components/Login'
import { ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-boost'
import { APOLLO_URI } from 'react-native-dotenv'
import { colors, fonts, padding, dimensions } from './styles/base.js'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { AsyncStorage } from 'react-native'
import Profile from './components/Profile'
import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NotesPage from './screens/NotesPage'
import EditNotePage from './screens/EditNotePage'
import HomePage from './screens/HomePage'

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd'
  }
})

console.log(APOLLO_URI)

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

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => {
  const [page, setPage] = useState('notes')
  const [token, setToken] = useState(AsyncStorage.getItem('token'))

  const onTokenChange = async value => {
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
            <Login show={true} client={client} tokenChange={onTokenChange} />
          </ApolloProvider>
        </View>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
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
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='Notes'>
            {props => <NotesPage {...props} client={client} />}
          </Stack.Screen>
          <Stack.Screen
            name='EditNote'
            component={EditNotePage}
            options={{ title: 'Edit note' }}
          />
          <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
      </ApolloProvider>
      {/*      
      <View style={styles.container}>
        <Header />
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
            buttonStyle={{ borderColor: 'black', borderWidth: 0.5 }}
            title='Profile'
            onPress={() => setPage('profile')}
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
              client.resetStore()
              setToken(null)
            }}
          />
          <Notes show={page === 'notes'} client={client} />
          <AddNote show={page === 'addnote'} client={client} />
          <Profile show={page === 'profile'} token={token} />
          <Login
            show={page === 'login'}
            client={client}
            tokenChange={onTokenChange}
          />
        </ApolloProvider>
      </View>
      */}
    </NavigationContainer>
  )
}
export default App
