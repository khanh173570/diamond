import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserRequest } from './page/Request/UserRequest.jsx'
import { ViewReciptList } from './page/ViewReciptList.jsx'
import { CreateRecipt } from './page/CreateRecipt.jsx'
import { CreateCommitment } from './page/CreateCommitment.jsx'
import { Home } from './page/Home.jsx'
import UserRequestDetail from './page/Request/UserRequestDetails.jsx'
import { PersonalInformation } from './page/PersonalInformation.jsx'
import { ValuationApplication } from './page/ValuationApplication/ValuationApplication.jsx'
import { GeneratePDF } from './page/ValuationApplication/GeneratePDF.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {/* Đổi thành home sau */}
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='user-request' element={<UserRequest />} />
          <Route path="user-request/:id" element={<UserRequestDetail />} />
          <Route path='view-receipt' element={<ViewReciptList />} />
          <Route path='create-recipt' element={<CreateRecipt />} />
          <Route path='commitment' element={<CreateCommitment />} />
          {/* <Route path='setting' element={<ViewReciptList />} /> */}
          <Route path='personal-info' element={<PersonalInformation />} />
          <Route path='evaluation-service' element={<CreateCommitment />} />
          <Route path='valuation' element={<ValuationApplication />} />
        </Route>
        <Route path='print-pdf' element={<GeneratePDF />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)
