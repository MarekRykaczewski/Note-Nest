import { Link } from "react-router-dom"
import { Tag } from "./App"
import ReactSelect from "react-select"
import { useState } from "react"

type NoteListProps = {
    availableTags: Tag[]
}

const NoteList = ({ availableTags }: NoteListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState("")

  return (
    <>
        <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold"> Notes </h1> 
            <div className="flex gap-3">
                <Link to="/new">
                    <button className="bg-blue-500 h-full hover:bg-blue-400 transition-colors duration-300 px-3 py-1 rounded-md text-white font-bold"> Create </button>
                </Link>
                <button className="bg-blue-500 h-full hover:bg-blue-400 transition-colors duration-300 px-3 py-1 rounded-md text-white font-bold"> Edit Tags </button>
            </div>
        </div>
        <form>
            <div className="mb-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor=""> Title </label>
                    <input 
											value={title} 
											className="border" 
											type="text" 
											onChange={e => setTitle(e.target.value)}
										/>
                </div>
            </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tags"> Tags </label>
            <ReactSelect 
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
        </form>
    </>
  )
}

export default NoteList