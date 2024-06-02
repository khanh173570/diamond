import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashBoard} from './page/dashBoard.jsx'
import {ManageBlog} from './page/ManageBlog.jsx'
import {ManageCustomer} from './page/ManageCustomer.jsx'
import {ManageStaff} from './page/ManageStaff.jsx'
import {ManageSchedule} from './page/ManageSchedule/ManageScheldule.jsx'
import {ManageOrder} from './page/ManageOrder.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        
         <Route path='/' element={<App />}>
         <Route path='dashboard' element={<DashBoard/>}/>
         <Route path='manageblog' element={<ManageBlog/>}/>
         <Route path='managecustomer' element={<ManageCustomer/>}/>
         <Route path='managestaff' element={<ManageStaff/>}/>
         <Route path='manageschedule' element={<ManageSchedule/>}/>
         <Route path='manageorder' element={<ManageOrder/>}/>
        
         </Route>
      </Routes>
   </BrowserRouter>
  </React.StrictMode>,
)
