import React, { Component } from 'react'
import { Layout, Text } from '@ui-kitten/components'

const HomeScreen = ({ show, client }) => {
  if (!show) {
    return null
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>HOME</Text>
    </Layout>
  )
}

export default HomeScreen
