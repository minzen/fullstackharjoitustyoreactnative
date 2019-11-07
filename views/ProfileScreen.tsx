import React, { Component } from 'react'
import { Button } from 'react-native-elements'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile'
  }
  render() {
    // const { navigate } = this.props.navigation
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => {
          console.log('go to profile')
          /*navigate('Profile', { name: 'Jane' })*/
        }}
      />
    )
  }
}
export default ProfileScreen
