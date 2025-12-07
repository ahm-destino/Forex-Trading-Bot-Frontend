import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthenticationLayout from './page-layout/AuthenticationLayout'
import InnerLayout from './page-layout/InnerLayout'
import Dashboard from './pages/dashboard'
import Login from './pages/Login'
import Settings from './pages/settings'


function App() {
  const [count, setCount] = useState(0)
  return(
    <BrowserRouter>
  
    <Routes>

      <Route path='/' element={<AuthenticationLayout />}>

        <Route index element={<Login />} />

      </Route>

      <Route path='/dashboard' element={<InnerLayout />}>

        <Route index element={<Dashboard />} />
        <Route path='settings' element={<Settings />} />

      </Route>

    </Routes>

  </BrowserRouter>

  )

  
}

export default App
