import { Routes, Route, Navigate } from "react-router-dom"
import "./index.css"

function App() {

  return (
    <div className="py-8 px-8">
    <Routes> 
      <Route path="/" element={<h1 className="text-3xl font-bold"> Note Nest 🪹 </h1>} />
      <Route path="/new" element={<h1> New </h1>} />
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
