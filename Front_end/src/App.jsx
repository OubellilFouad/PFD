import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes, useRoutes } from 'react-router-dom'
import Auth from './screens/Auth'
import Login from './screens/Auth/Login'
import Signup from './screens/Auth/Signup'
import Content from './screens/Content'
import Dashboard from './screens/Content/Dashboard'
import Gestionair from './screens/Content/Gestionair'
import Main from './screens/Content/Main'
import Layout from './screens/Layouts/Layout'

function App() {
  const Routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path='/Auth' element={<Auth/>}>
          <Route index element={<Signup/>}></Route>
          <Route path='login' element={<Login/>}></Route>
        </Route>
        <Route path='App' element={<Content/>}>
          <Route path='' element={<Main/>}>
            <Route path='' element={<Dashboard/>}/>
            <Route path='gestionair' element={<Gestionair/>}/>
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
