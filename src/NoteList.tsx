import { Link } from "react-router-dom"
import { Note, Tag } from "./App"
import ReactSelect from "react-select"
import { useMemo, useState } from "react"
import Modal from "./Modal"

type SimplifiedNote = {
	tags: Tag[]
	title: string
	id: string
}

type NoteListProps = {
    availableTags: Tag[]
		notes: Note[]
}

type EditTagsModalProps = {
  availableTags: Tag[]
  show: Boolean
  handleClose: () => void
}


const NoteList = ({ availableTags, notes }: NoteListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState("")
  const [editTagsModalOpen, setEditTagsModalOpen] = useState(false)


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
                <button onClick={() => setEditTagsModalOpen(true)} className="bg-blue-500 h-full hover:bg-blue-400 transition-colors duration-300 px-3 py-1 rounded-md text-white font-bold"> Edit Tags </button>
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
        <EditTagsModal availableTags={availableTags} show={editTagsModalOpen} handleClose={() => setEditTagsModalOpen(false)} />
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

const EditTagsModal = ({ availableTags, show, handleClose }: EditTagsModalProps) => {

  return (
    <Modal open={show}>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl h-7 font-bold"> Edit Tags</h1>
        <button onClick={() => handleClose()} className="text-5xl h-7 text-gray-500 line-clamp-1 flex items-center"> &times; </button>
      </div>
      <div className="border mb-4" />
      <div>
        <form className="flex flex-col gap-1" action="">
          {availableTags.map(tag => (
            <div className="flex" key={tag.id}>
              <div>
                <input type="text" value={tag.label} name="" id="" />
              </div>
              <div>
                <button className="hover:bg-red-500 hover:text-white px-3 py-1 border-2 transition-colors duration-300 hover:border-transparent rounded-md text-gray-500 font-bold"> &times; </button>
              </div>
            </div>
          ))}
        </form>
      </div>
    </Modal>
  )
}

export default NoteList