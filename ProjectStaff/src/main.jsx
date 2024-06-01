import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserRequest } from './page/Request/UserRequest.jsx'
import { CreateReceipt } from './page/ReciptApplication/CreateRecipt.jsx'
import { CreateCommitment } from './page/CreateCommitment.jsx'
import { Home } from './page/Home.jsx'
import { ValuationList } from './page/ValuationApplication/ValuationList.jsx'
import { PersonalInformation } from './page/PersonalInformation.jsx'
import { ValuationApplication } from './page/ValuationApplication/ValuationApplication.jsx'
import { ReciptDetails } from './page/ReciptApplication/ReciptDetails.jsx'
import { ViewReciptList } from './page/ViewReciptListApplication/ViewReciptList.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {/* Đổi thành home sau */}
          {/* <Route index element={<TestSelectService />} /> */}
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='user-request' element={<UserRequest />} />
         {/*<Route path="user-request/:id" element={<UserRequestDetails1 />} /> */}
           <Route path='view-receipt' element={<ViewReciptList />} />
          <Route path='view-receipt' element={<ReciptDetails />} />

          <Route path='create-recipt' element={<CreateReceipt />} />
          <Route path='commitment' element={<CreateCommitment />} />
           <Route path='setting' element={<ViewReciptList />} /> 
          
          <Route path='personal-info' element={<PersonalInformation />} />
          <Route path='valuation' element={<ValuationApplication />} />
          <Route path='valuation-result-list' element={<ValuationList />} /> 
          {/* <Route path="valuation/print" element={<GeneratePDF />} /> */}
        </Route>
     
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)
