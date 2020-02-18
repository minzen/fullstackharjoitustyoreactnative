// Form for editing/creating a new note
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Input, Button, Card, Avatar } from 'react-native-elements'
import { dimensions, colors, padding, fonts } from '../styles/base.js'

const NoteForm = props => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [keywords, setKeywords] = useState('')

  const handleAddNote = async event => {
    console.log(
      'handleAddNote title:',
      title,
      ', content:',
      content,
      ', keywords:',
      keywords
    )
    try {
      const created = await props.addNote({
        variables: { title, content, keywords }
      })
      console.log('created', created)
    } catch (e) {
      console.log('error when adding a note', e)
    }

    setTitle('')
    setContent('')
    setKeywords('')
  }

  return (
      <Card title='Edit note'>
      <Input
        placeholder='Enter title...'
        // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        label='Title'
        value={title}
        onChangeText={title => setTitle(title)}
      />

      <Input
        placeholder='Enter note content...'
        label='Note content'
        value={content}
        onChangeText={content => setContent(content)}
      />

      <Input
        placeholder='Enter note keywords...'
        label='Keywords'
        value={keywords}
        onChangeText={keywords => setKeywords(keywords)}
      />

      <Button title='Add note' onPress={handleAddNote} />

      </Card>
  )
}
export default NoteForm
