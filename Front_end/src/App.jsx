import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes, useRoutes } from 'react-router-dom'
import Auth from './screens/Auth'
import Login from './screens/Auth/Login'
import Signup from './screens/Auth/Signup'
import Content from './screens/Content'
import AdminDashboard from './screens/Content/admin/AdminDashboard'
import DepInfo from './screens/Content/admin/DepInfo'
import Gestionair from './screens/Content/admin/Gestionair'
import Main from './screens/Content/Main'

function App() {
  const Routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path='/' element={<Auth/>}>
          <Route index element={<Signup/>}></Route>
          <Route path='login' element={<Login/>}></Route>
        </Route>
        <Route path='App' element={<Content/>}>
          <Route path='' element={<Main/>}>
            <Route path='' element={<AdminDashboard/>}/>
            <Route path='gestionair' element={<Gestionair/>}/>
            <Route path='info' element={<DepInfo/>}/>
          </Route>
        </Route>
      </Route>
    )
  )
  return(
    <RouterProvider router={Routes}/>
  )
}

export default App
