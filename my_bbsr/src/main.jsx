import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import TempleDetails from './components/TempleDetails'
import TemplePage from './components/TemplePage'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AnimatePresence>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/temples" element={<TemplePage />} />
        <Route path="/temple/:placeId" element={<TempleDetails />} />
      </Routes>
    </AnimatePresence>
  </BrowserRouter>
)
