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
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { APOLLO_URI } from 'react-native-dotenv'
import { colors, fonts, padding, dimensions } from './styles/base.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  }
})

const client = new ApolloClient({
  uri: APOLLO_URI
})

const App = () => {
  const [page, setPage] = useState('notes')

  return (
    <View style={styles.container}>
      <View
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
          title='Login'
          onPress={() => setPage('login')}
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
          <Login show={page === 'login'} client={client} />
        </ImageBackground>
      </ApolloProvider>
    </View>
  )
}
export default App
