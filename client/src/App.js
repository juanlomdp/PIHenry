import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import Detail from './pages/Detail/Detail'
import Form from './pages/Form/Form'
import Landing from './pages/Landing/Landing'
import Nav from './components/Nav/Nav'

import axios from 'axios'
// http://localhost:3001/
//https://pihenry-production.up.railway.app/
axios.defaults.baseURL = 'https://pihenry-production.up.railway.app/'

function App () {
  const location = useLocation()
  return (
    <div className='App'>

      {
      location.pathname === '/' ? <div> </div> : <div> <Nav /> </div>
    }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='videogames' element={<Home />} />
        <Route path='detail/:id' element={<Detail />} />
        <Route path='form' element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
