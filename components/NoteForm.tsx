// Form for editing/creating a new note
import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'

const NoteForm = props => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [keywords, setKeywords] = useState('')
  // TODO: Add user

  const handleAddNote = async event => {
    console.log(
      'handleAddNote title:',
      title,
      ', content:',
      content,
      ', keywords:',
      keywords
    )
    event.preventDefault()

    await props.addNote({
      variables: { title, content, keywords }
    })

    setTitle('')
    setContent('')
    setKeywords('')
  }

  return (
    <View>
      <Text h2>Edit note</Text>
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
    </View>
  )
}
export default NoteForm
