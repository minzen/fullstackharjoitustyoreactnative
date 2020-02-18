import React, { Component, useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import {
  Text,
  SearchBar,
  Button,
  ListItem,
  Icon,
  Card
} from 'react-native-elements'
import { ScrollView } from 'react-native'
import Note from './Note'
import { Subscription } from 'rxjs'

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

const Notes = ({ show, client }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [notes, setNotes] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [overlayVisible, setOverlayVisible] = useState(false)

  const maxLength: Number = 40

  if (!show) {
    return null
  }

  console.log('Obtaining notes...')
  const querySubscription: Subscription = client
    .watchQuery({
      query: ALL_NOTES,
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data, loading }) => {
      if (data && data.allNotes) setNotes(data.allNotes)
    })

  const handleTextChange = search => {
    console.log(`Setting ${search} to the search term`)
    setSearchTerm(search)
  }

  const handleNewNote = () => {
    console.log('Create a new note event')
  }

  const handleNotePress = note => {
    console.log('Press on a list item', note.id)
    setSelectedNote(note)
    setOverlayVisible(true)
  }

  const handleNoteLongPress = id => {
    console.log('Long Press on a list item', id)
  }

  function extractKeywordsFromArrayWithJoin(keywords) {
    console.log('keywords :', keywords)
    if (!keywords) {
      return ''
    }
    return keywords.join()
  }

  if (notes) {
    console.log('Notes to be printed out', notes)
    return (
      <>
        {/* <SearchBar
          placeholder='Search for notes...'
          onChangeText={handleTextChange}
          value={searchTerm}
        /> */}
        <ScrollView style={{ backgroundColor: 'white' }}>
          <Card title='Stored notes'>
            {notes.map((note, index) => {
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
      </>
    )
  }

  return (
    <>
      <Text>Stored Notes</Text>
      <Text>No stored notes found.</Text>
    </>
  )
}
export default Notes
