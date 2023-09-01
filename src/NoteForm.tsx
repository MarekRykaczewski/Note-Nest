import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({ 
  onSubmit, 
  onAddTag, 
  availableTags, 
  title = "",
  markdown = "",
  tags = []
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigate("..")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 flex-col" action="">
        <div className="flex flex-col gap-1">
            <label htmlFor="title"> Title </label>
            <input ref={titleRef} className="border" id="title" type="text" required defaultValue={title} />
        </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="tags"> Tags </label>
            <CreatableReactSelect 
            onCreateOption={label => {
              const newTag = { id: uuidV4(), label }
              onAddTag(newTag)
              setSelectedTags(prev => [...prev, newTag])
            }}
            options={availableTags.map(tag => {
              return { label: tag.label, value: tag.id}
            })}
            value={selectedTags.map(tag => {
              return { label: tag.label, value: tag.id}
            })} 
            onChange={tags => {
              setSelectedTags(tags.map(tag => {
                return { label: tag.label, id: tag.value }
              }))
            }}
            isMulti 
            />
        </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="markdown"> Body </label>
            <textarea ref={markdownRef} name="markdown" id="markdown" cols={30} rows={15} required defaultValue={markdown} />
        </div>

        <div className="flex gap-2 justify-end">
          <button className="bg-blue-500 hover:bg-blue-400 transition-colors duration-300 px-3 py-1 rounded-md text-white font-bold" type="submit">
            Save
          </button>
          <Link to={".."}>
            <button className="hover:bg-red-500 hover:text-white px-3 py-1 border-2 transition-colors duration-300 hover:border-transparent rounded-md text-gray-500 font-bold" type="button">
              Cancel
            </button>
          </Link>
        </div>
    </form>
  )
}

export default NoteForm