import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Stored Notes</Text>
      <Text style={styles.textStyle}>
        This section will contain the actual notes obtained by GraphQL
      </Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerStyle: {
    fontSize: 24,
    marginBottom: 10
  },
  textStyle: {
    fontSize: 16
  }
})
