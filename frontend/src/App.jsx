import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import CreateNote from './pages/Create'
import Note from './pages/Note'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient: need to change with the color of the theme */}
      <div className="fixed inset-0 -z-10 h-full w-full dynamic-bg"></div>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
