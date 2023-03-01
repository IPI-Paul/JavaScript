import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
// import data from '../data'
import Split from 'react-split'
import { nanoid } from 'nanoid'
import '../style.css'


const App = () => {
  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  )

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  const updateNote = (text) => {
    setNotes(oldNotes => oldNotes.map(oldNote => 
      oldNote.id === currentNoteId 
        ? {...oldNote, body: text}
        : oldNote
    ))
  }

  const findCurrentNote = () => (
    notes.find(note => note.id === currentNoteId) || notes[0]
  )

  return (
    <main>
      {
        notes.length > 0
          ? <Split 
              sizes={[30, 98]}
              direction='horizontal'
              className="split"
            >
              <Sidebar 
                notes={notes}
                currentNote={findCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
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