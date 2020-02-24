import React, { useState } from 'react'
import {
  StyleSheet,
  Modal,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native'
import { Card, Text, Overlay } from 'react-native-elements'

export interface NoteType {
  title: string
  content: string
  keywords: Array<string>
}

type NoteProps = {
  note: NoteType
  overlayVisible: boolean
  setOverlayVisible: any
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4682B4',
    flex: 1
  },
  cardTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardText: {
    fontSize: 18,
    marginBottom: 5
  }
})

const Note = (props: NoteProps) => {
  if (!props.note) {
    return null
  }

  return (
    <Overlay
      isVisible={props.overlayVisible}
      windowBackgroundColor='rgba(34,34,34,1)'
      overlayBackgroundColor='rgba(34,34,34,1)'
      height='90%'
      width='90%'
      onBackdropPress={() => props.setOverlayVisible(!props.overlayVisible)}
    >
      <Card
        title='Note'
        containerStyle={styles.container}
        titleStyle={styles.cardTitle}
      >
        <ScrollView>
          <Text style={styles.cardHeader}>Title:</Text>
          <Text style={styles.cardText}>{props.note.title}</Text>
          <Text style={styles.cardHeader}>Content:</Text>
          <Text style={styles.cardText}>{props.note.content}</Text>
          <Text style={styles.cardHeader}>Keywords:</Text>
          <Text style={styles.cardText}>{props.note.keywords}</Text>
        </ScrollView>
      </Card>
    </Overlay>
  )
}
export default Note
