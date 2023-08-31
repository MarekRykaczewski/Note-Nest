import { Link } from "react-router-dom"
import { useNote } from "./NoteLayout"

const Note = () => {
    const note = useNote()
  return (
    <>
      <div className="flex items-center mb-4 justify-between">
				<div>
					<h1>{note.title}</h1>
					{note.tags.length > 0 && (
						<div className="flex gap-1">
						{note.tags.map(tag => (
							<div className="bg-blue-500 text-xs w-fit rounded-md py-1 px-2 text-white font-bold truncate" key={tag.id}>{tag.label}</div>
						))}
					</div>
					)}
				</div>
				<div>
					<div className="flex gap-3">
						<Link to={`/${note.id}/edit`}>
								<button className="bg-blue-500 h-full hover:bg-blue-400 transition-colors duration-300 px-3 py-1 rounded-md text-white font-bold"> Edit </button>
						</Link>
						<button className="hover:bg-red-500 hover:text-white px-3 py-1 border-2 transition-colors duration-300 hover:border-transparent rounded-md text-gray-500 font-bold"> Delete </button>
						<Link to="/">
							<button className="hover:bg-gray-500 hover:text-white px-3 py-1 border-2 transition-colors duration-300 hover:border-transparent rounded-md text-gray-500 font-bold"> Back </button>
						</Link>	
					</div>
				</div>
			</div>
    </>
  )
}

export default Note