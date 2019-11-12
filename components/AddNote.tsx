import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import NoteForm from './NoteForm'

const AddNote = ({ show, client }) => {
  if (!show) {
    return null
  }

  const ADD_NOTE = gql`
    mutation createNote(
      $title: String!
      $content: String!
      $keywords: [String]
      $user: User
    ) {
      addNote(
        title: $title
        content: $content
        keywords: $keywords
        user: $user
      ) {
        title
        content
        id
        keywords
        user
      }
    }
  `

  return (
    <Mutation mutation={ADD_NOTE}>
      {createNote => <NoteForm addNote={createNote} />}
    </Mutation>
  )
}
export default AddNote
