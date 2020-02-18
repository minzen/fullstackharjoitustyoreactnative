import React from 'react'
import { View, Text } from 'react-native'
import { Image, Tile } from 'react-native-elements'

const Header = () => {
  return (
    <View>
      <Tile
        imageSrc={require('../assets/img/postit.png')}
        title='Memory Tracks'
        featured
        titleStyle={{ color: 'black' }}
        containerStyle={{ height: 160 }}
        imageContainerStyle={{ opacity: 0.5 }}
      />
    </View>
  )
}
export default Header
