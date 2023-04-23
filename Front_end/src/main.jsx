import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import App from './App'
import './index.css'
import {AdminContext} from './screens/Content/admin/context/AdminContext'
import { ChefContext } from './screens/Content/chefDep/context/ChefContext'
import { ProfContext } from './screens/Content/Prof/context/ProfContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContext>
        <AdminContext>
            <ChefContext>
                <ProfContext>
                    <App />
                </ProfContext>
            </ChefContext>
        </AdminContext>
    </AuthContext>
)
