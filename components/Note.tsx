import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

const Note = ({ show, client, note }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ddd'
    }
  })

  if (!show) {
    return null
  }

  if (note) {
    const keywords = note.keywords.join()
    return (
      <View style={styles.container}>
        <Text h3 style={{ fontWeight: 'bold' }}>
          {note.title}
        </Text>
        <Text>{note.content}</Text>
        <Text>{keywords}</Text>
      </View>
    )
  }
  return (
    <>
      <Text>Placeholder</Text>
    </>
  )
}
export default Note
