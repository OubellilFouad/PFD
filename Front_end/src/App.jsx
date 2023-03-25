import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes, useRoutes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Auth from './screens/Auth'
import Login from './screens/Auth/Login'
import Signup from './screens/Auth/Signup'
import Content from './screens/Content'
import AdminDashboard from './screens/Content/admin/AdminDashboard'
import DepInfo from './screens/Content/admin/DepInfo'
import Gestionair from './screens/Content/admin/Gestionair'
import ChefDashboard from './screens/Content/chefDep/ChefDashboard'
import Enseingant from './screens/Content/chefDep/Enseingant'
import Modules from './screens/Content/chefDep/Modules'
import Sections from './screens/Content/chefDep/Sections'
import Main from './screens/Content/Main'

function App() {
  const {user} = useAuth();
  const Routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path='/' element={<Auth/>}>
          <Route index element={<Signup/>}></Route>
          <Route path='login' element={<Login/>}></Route>
        </Route>
        <Route path='App' element={<Content/>}>
          <Route path='' element={<Main/>}>
            {user?.type === 0 && (
              <>
                <Route path='' element={<AdminDashboard/>}/>
                <Route path='gestionair' element={<Gestionair/>}/>
                <Route path='info' element={<DepInfo/>}/>
                {/* <Route path='' element={<ChefDashboard/>}/>
                <Route path='enseignant' element={<Enseingant/>}/>
                <Route path='sections' element={<Sections/>}/>
                <Route path='modules' element={<Modules/>}/> */}
              </>
            )}
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
