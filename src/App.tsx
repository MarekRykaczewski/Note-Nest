import { Routes, Route, Navigate } from "react-router-dom"
import "./index.css"
import NewNote from "./NewNote"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import NoteList from "./NoteList"
import NoteLayout from "./NoteLayout"
import Note from "./Note"
import EditNote from "./EditNote"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNoteData = {
  id: string
  markdown: string
  tagIds: string[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <div className="py-8 px-8">
    <Routes> 
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} />} />
      <Route path="/new" element={
        <NewNote 
          onSubmit={onCreateNote} 
          onAddTag={addTag} 
          availableTags={tags}
        />
        } 
      />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note onDeleteNote={onDeleteNote} />} />
        <Route path="edit" element={
        <EditNote 
          onSubmit={onUpdateNote} 
          onAddTag={addTag} 
          availableTags={tags} 
        />
        } 
      />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </div>
  )
}

export default App
