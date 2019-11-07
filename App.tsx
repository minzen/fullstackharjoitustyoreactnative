import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, ThemeProvider, Header, Text } from 'react-native-elements'
import Notes from './components/Notes'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './views/HomeScreen'
import ProfileScreen from './views/ProfileScreen'
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

/*
const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
})
const App = createAppContainer(MainNavigator)
export default App
*/

export default function App() {
  return (
    <ThemeProvider>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Muistijäljet', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Notes />
      <View style={styles.container}>
        <Button
          title='Show notes'
          onPress={() => {
            console.log('Show notes pressed')
            window.alert('Show notes')
          }}
        />
        <Button
          title='Login'
          onPress={() => {
            console.log('Login pressed')
            window.alert('Login')
          }}
        />
      </View>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headerStyle: {
    fontSize: 24,
    marginBottom: 10
  },
  textStyle: {
    fontSize: 16
  }
})
