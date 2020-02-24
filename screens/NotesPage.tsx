import React, { Component, useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Text, SearchBar, Button, ListItem, Card } from 'react-native-elements'
import { ScrollView } from 'react-native'
import Note from '../components/Note'
import { Subscription } from 'rxjs'
import Icon from 'react-native-vector-icons/FontAwesome'

const ALL_NOTES = gql`
  query {
    allNotes {
      id
      title
      content
      keywords
      user {
        id
        email
      }
    }
  }
`

interface INoteType {
  id: string
  title: string
  content: string
}

interface ISubscription {
  data: any
  loading: boolean
}

type NotesPageProps = {
  navigation: any
  client: any
}

const NotesPage = (props: NotesPageProps) => {
  const [notes, setNotes] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [overlayVisible, setOverlayVisible] = useState(false)

  const maxLength: number = 40
  let data: any
  let loading: boolean
  console.log('Obtaining notes...')
  const querySubscription: Subscription = props.client
    .watchQuery({
      query: ALL_NOTES,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data, loading }: ISubscription) => {
      if (data && data.allNotes) setNotes(data.allNotes)
    })

  const handleNotePress = (note: INoteType | undefined) => {
    console.log('Press on a list item', note.id)
    setSelectedNote(note)
    setOverlayVisible(true)
  }

  const handleNoteLongPress = (id: string) => {
    console.log('Long Press on a list item', id)
  }

  if (notes) {
    console.log('Notes to be printed out', notes)
    return (
      <>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <Card title='Stored notes'>
            {notes.map((note: INoteType, index: number) => {
              return (
                <ListItem
                  key={index}
                  title={note.title}
                  titleStyle={{ fontWeight: 'bold' }}
                  subtitle={note.content.substr(0, maxLength) + '...'}
                  bottomDivider
                  onPress={() => handleNotePress(note)}
                  onLongPress={() => handleNoteLongPress(note.id)}
                />
              )
            })}
          </Card>
        </ScrollView>
        <Note
          note={selectedNote}
          overlayVisible={overlayVisible}
          setOverlayVisible={setOverlayVisible}
        />

        <Button
          icon={<Icon name='plus' size={15} color='white' />}
          title=' Add a new note'
          onPress={() => props.navigation.navigate('EditNote')}
        />
      </>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Card title='Stored notes'>
        <Text>No stored notes found.</Text>
      </Card>
    </ScrollView>
  )
}
export default NotesPage
