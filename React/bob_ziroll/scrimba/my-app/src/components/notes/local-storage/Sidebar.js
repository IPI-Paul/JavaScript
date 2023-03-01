import React from "react"

const Sidebar = (props) => {
  const {notes, currentNote, setCurrentNoteId, newNote, deleteNote} = props
  const noteElements = notes.map((note, index) => {
    const firstRow = note.body.split('\n')[0] 
    const summary =  firstRow.substring(0, 25) + 
      (firstRow.length > 25 ? '...' : '')
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === currentNote.id ? 'selected-note' : '' 
          }`}
          onClick={() => setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{summary}</h4>
          <button className="delete-btn" onClick={(event) => deleteNote(event, note.id)}>
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    )
  })

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>+</button>
      </div>
      {noteElements}
    </section>
  )
}

export default Sidebar