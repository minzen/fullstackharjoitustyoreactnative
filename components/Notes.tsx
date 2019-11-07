import React, { Component, useState } from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Text, SearchBar, Button, ListItem, Icon } from 'react-native-elements'
import { schemaDefinitionNotAloneMessage } from 'graphql/validation/rules/LoneSchemaDefinition'
import { ScrollView } from 'react-native'

const ALL_NOTES = gql`
  query {
    allNotes {
      id
      title
      content
      keywords
      user
    }
  }
`

const Notes = ({ show, client }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [notes, setNotes] = useState(null)
  const maxLength: Number = 40

  if (!show) {
    return null
  }

  const handleTextChange = search => {
    console.log(`Setting ${search} to the search term`)
    setSearchTerm(search)
  }

  const handleNewNote = () => {
    console.log('Create a new note event')
  }

  const handleNotePress = id => {
    console.log('Press on a list item', id)
  }

  const handleNoteLongPress = id => {
    console.log('Long Press on a list item', id)
  }

  const getNotes = async () => {
    console.log('Obtaining notes...')
    const { data } = await client.query({
      query: ALL_NOTES
    })
    console.log('response of allNotes', data.allNotes)
    await setNotes(data.allNotes)
  }
  getNotes()

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
        <SearchBar
          placeholder='Search for notes...'
          onChangeText={handleTextChange}
          value={searchTerm}
        />
        <Text h2>Stored Notes</Text>
        <ScrollView>
          {notes.map((note, index) => {
            return (
              <ListItem
                key={index}
                title={note.title}
                titleStyle={{ fontWeight: 'bold' }}
                subtitle={note.content.substr(0, maxLength) + '...'}
                bottomDivider
                onPress={() => handleNotePress(note.id)}
                onLongPress={() => handleNoteLongPress(note.id)}
              />
            )
          })}
        </ScrollView>
      </>
    )
  }

  return (
    <>
      <SearchBar
        placeholder='Search for notes...'
        onChangeText={handleTextChange}
        value={searchTerm}
      />
      <Text h2>Stored Notes</Text>
      <Text>No stored notes found.</Text>
    </>
  )
}
export default Notes
