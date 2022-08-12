import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home, Login, ProductsDetail, Purchases} from './pages/'
import { NavBar, LoadingScreen } from './components'
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        { isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductsDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
