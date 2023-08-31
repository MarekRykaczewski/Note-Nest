import { Routes, Route, Navigate } from "react-router-dom"
import "./index.css"
import NewNote from "./NewNote"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"

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

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <div className="py-8 px-8">
    <Routes> 
      <Route path="/" element={<h1 className="text-3xl font-bold"> Note Nest 🪹 </h1>} />
      <Route path="/new" element={
        <NewNote 
          onSubmit={onCreateNote} 
          onAddTag={addTag} 
          availableTags={tags}
        />
        } 
      />
      <Route path="/:id">
        <Route index element={<h1> Show </h1>} />
        <Route path="edit" element={<h1> Edit </h1>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </div>
  )
}

export default App
