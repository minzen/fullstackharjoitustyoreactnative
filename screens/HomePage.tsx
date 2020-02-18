import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import Header from '../components/Header'

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Header />
      <Button title='View notes' onPress={() => navigation.navigate('Notes')} />
    </View>
  )
}
export default HomePage
