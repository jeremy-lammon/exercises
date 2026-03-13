import './App.css'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { useState } from 'react';
import EditPage from './pages/EditPage';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  return (
    <Router>

      <Navigation />
      <header>
        <h1> Exercise Tracker </h1>
        <p>
          Welcome to my full stack MERN project for module 9. Here, you can create, view, edit, and delete exercises to keep track of your fitness journey.
        </p>
      </header>
      <Routes>
        <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit" element={<EditPage exerciseToEdit={exerciseToEdit} />} />
      </Routes>
      <footer>
        <p>© 2026 Jeremy Lammon</p>
      </footer>
    </Router>
  )
}

export default App
