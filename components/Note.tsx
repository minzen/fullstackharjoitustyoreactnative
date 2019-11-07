import React, {useState} from 'react'
import { Text } from 'react-native-elements'

const Note = ({show, client, note}) => {
    if (!show) {
        return null
    }

    return (
        <>
        <Text h2>Note details</Text>
        </>
    )
}
export default Note
