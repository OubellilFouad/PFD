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
import Chambres from './screens/Content/chefDep/Chambres'
import ChefDashboard from './screens/Content/chefDep/ChefDashboard'
import Enseingant from './screens/Content/chefDep/Enseingant'
import Modules from './screens/Content/chefDep/Modules'
import Sections from './screens/Content/chefDep/Sections'
import Speciality from './screens/Content/chefDep/Speciality'
import Main from './screens/Content/Main'
import Desponibilité from './screens/Content/Prof/Desponibilité'
import Choix from './screens/Content/Prof/Choix'
import Paliers from './screens/Content/chefDep/Paliers'
import ChargeTest from './screens/Content/chefDep/ChargeTest'
import TCformation from './screens/Content/admin/TCformation'
import TCPaliers from './screens/Content/admin/TCPalier'
import TcSection from './screens/Content/admin/TcSection'
import TcModule from './screens/Content/admin/TcModule'
import GestDashboard from './screens/Content/Gestionair/GestDashboard'
import EDT from './screens/Content/Gestionair/EDT'
import SectionEDT from './screens/Content/Gestionair/SectionEDT'
import GroupEDT from './screens/Content/Gestionair/GroupEDT'
import EDTProf from './screens/Content/Prof/EDTProf'
import ProfEDT from './screens/Content/Gestionair/ProfEDT'
import EDTP from './screens/Content/Gestionair/components/EDTP'
import Emplois from './screens/Content/Student/Emplois'
import Landing from './screens/Content/Landing'

function App() {
  const {user} = useAuth();
  const Routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}>
          <Route index element={<Signup/>}></Route>
          <Route path='login' element={<Login/>}></Route>
        </Route>
        <Route path='App' element={<Content/>}>
          <Route path='' element={<Main/>}>
            {user?.role === 0 && (
              <>
                <Route path='' element={<AdminDashboard/>}/>
                <Route path='gestionnaire' element={<Gestionair/>}/>
                <Route path='info' element={<DepInfo/>}/>
                <Route path='resource' element={<Chambres/>}/>
                <Route path='tcformation' element={<TCformation/>}/>
                <Route path='tcpal' element={<TCPaliers/>}/>
                <Route path='tcsec' element={<TcSection/>}/>
                <Route path='tcmod' element={<TcModule/>}/>
              </>
            )}
            {user?.role === 1 && (
              <>
                <Route path='' element={<Enseingant/>}/>
                <Route path='sections' element={<Sections/>}/>
                <Route path='speciality' element={<Speciality/>}/>
                <Route path='paliers' element={<Paliers/>}/>
                <Route path='modules' element={<Modules/>}/>
                <Route path='charge' element={<ChargeTest/>}/>
                <Route path='edtprof' element={<ProfEDT/>}/>
                <Route path='edtp' element={<EDTP/>}/>
                <Route path='disp' element={<Desponibilité/>}/>
                <Route path='choix' element={<Choix/>}/>
              </>
            )}
            {user?.role === 2 && (
              <>
                <Route path='' element={<GestDashboard/>}/>
                <Route path='edt' element={<EDT/>}/>
                <Route path='sec' element={<SectionEDT/>}/>
                <Route path='grp' element={<GroupEDT/>}/>
                <Route path='edtprof' element={<ProfEDT/>}/>
                <Route path='edtp' element={<EDTP/>}/>
              </>
            )}
            {user?.role === 3 && (
              <>
                <Route path='' element={<Desponibilité/>}/>
                <Route path='choix' element={<Choix/>}/>
                <Route path='edt' element={<EDTProf/>}/>
              </>
            )}
            {user?.role === 4 && (
              <>
                <Route path='' element={<Emplois/>}/>
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
