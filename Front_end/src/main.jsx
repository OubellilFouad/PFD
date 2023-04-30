import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import App from './App'
import './index.css'
import {AdminContext} from './screens/Content/admin/context/AdminContext'
import { ChefContext } from './screens/Content/chefDep/context/ChefContext'
import { ProfContext } from './screens/Content/Prof/context/ProfContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GestContext } from './screens/Content/Gestionair/context/GestContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContext>
        <AdminContext>
            <ChefContext>
                <ProfContext>
                    <GestContext>
                        <DndProvider backend={HTML5Backend}>
                            <App />
                        </DndProvider>
                    </GestContext>
                </ProfContext>
            </ChefContext>
        </AdminContext>
    </AuthContext>
)
