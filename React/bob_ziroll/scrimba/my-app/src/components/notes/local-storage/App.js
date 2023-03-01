import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import data from '../data'
import Split from 'react-split'
import { nanoid } from 'nanoid'
import '../style.css'


const App = () => {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem('notes')) || data)
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  )

  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  const updateNote = (text) => {
    setNotes(prevNotes => {
      const newArray = []
      prevNotes.map(note => {
        note.id === currentNoteId
          ? newArray.unshift({...note, body: text})
          : newArray.push(note)
        return newArray
      })
      return newArray
    })
  }

  const deleteNote = (event, noteId) => {
    event.stopPropagation()
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
  }

  const findCurrentNote = () => (
    notes.find(note => note.id === currentNoteId) || notes[0]
  )

  return (
    <main>
      {
        notes.length > 0
          ? <Split 
              sizes={[23, 77]}
              direction='horizontal'
              className="split"
            >
              <Sidebar 
                notes={notes}
                currentNote={findCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
                deleteNote={deleteNote}
              />
              {
                currentNoteId && 
                notes.length > 0 && 
                <Editor 
                  currentNote={findCurrentNote()}
                  updateNote={updateNote}
                />
              }
            </Split>
          : <div className="no-notes">
              <h1>You have no notes</h1>
              <button
                className="first-note"
                onClick={createNewNote}
              >
                Create one now
              </button>
            </div>
      }
    </main>
  )
}

export default App