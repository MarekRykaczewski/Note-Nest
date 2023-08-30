import { Link } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"

const NoteForm = () => {
  return (
    <form className="flex gap-3 flex-col" action="">
        <div className="flex flex-col gap-1">
            <label htmlFor="title"> Title </label>
            <input className="border" id="title" type="text" />
        </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="tags"> Tags </label>
            <CreatableReactSelect isMulti />
        </div>

        <div className="flex flex-col gap-1">
            <label htmlFor="markdown"> Body </label>
            <textarea name="markdown" id="markdown" cols="30" rows="15" />
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