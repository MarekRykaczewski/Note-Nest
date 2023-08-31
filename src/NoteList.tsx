import { Link } from "react-router-dom"
import { Note, Tag } from "./App"
import ReactSelect from "react-select"
import { useMemo, useState } from "react"

type SimplifiedNote = {
	tags: Tag[]
	title: string
	id: string
}

type NoteListProps = {
    availableTags: Tag[]
		notes: Note[]
}


const NoteList = ({ availableTags, notes }: NoteListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState("")

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          // Ensuring all tags match not just some
					selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

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
				<div className="mt-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-3">
						{filteredNotes.map(note => (
							<div key={note.id}>
								<NoteCard id={note.id} title={note.title} tags={note.tags} />
							</div>
						))}
				</div>
    </>
  )
}

const NoteCard = ({id, title, tags}: SimplifiedNote ) => {
	return (
	<Link to={`/${id}`}>
		<div className="border rounded-lg p-10 h-full transition-transform transition-shadow duration-100 ease-in-out card hover:translate-y-[-5px] hover:shadow-md focus:translate-y-[-5px] focus:shadow-md">
			<div className="h-full flex flex-col gap-2 items-center justify-center">
				<span className="text-2xl">{title}</span>
				{tags.length > 0 && (
					<div className="flex gap-1">
						{tags.map(tag => (
							<div className="bg-blue-500 text-xs w-fit rounded-md py-1 px-2 text-white font-bold truncate" key={tag.id}>{tag.label}</div>
						))}
					</div>
				)}
			</div>
		</div>
	</Link>
	)
}

export default NoteList