import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Login from './page/pageCustomer/Login.jsx';
import StaffApp from './layout/StaffApp.jsx';
import CustomerApp from './layout/CustomerApp';
import AdminApp from './layout/AdminApp.jsx';

// Staff Pages
import HomeStaff from './page/pageStaff/HomeStaff.jsx';
import { UserRequest } from './page/pageStaff/Request/UserRequest.jsx';
import { ViewReciptList } from './page/pageStaff/ViewReciptListApplication/ViewReciptList.jsx';
import { CreateReceipt } from './page/pageStaff/ReciptApplication/CreateRecipt.jsx';
import CreateCommitment from './page/pageStaff/CreateCommitment';
import { PersonalInformation } from './page/pageStaff/PersonalInformation';
import { ValuationApplication } from './page/pageStaff/ValuationApplication/ValuationApplication.jsx';
import { ReceiptDetails } from './page/pageStaff/ReciptApplication/ReciptDetails.jsx';

// Customer Pages
import HomeCustomer from './page/pageCustomer/HomeCustomer.jsx';
import Signup from './page/pageCustomer/Signup';
import Blog from './page/pageCustomer/Blog';
import Contact from './page/pageCustomer/Contact';
import EvaluationServicePage from './page/pageCustomer/EvaluationServicePage';
import Calculate from './page/pageCustomer/Calculate';
import Check from './page/pageCustomer/Check';
import { PersonalRequest } from './page/pageCustomer/PersonalRequest';

// Admin Pages
import { DashBoard } from './page/pageAdmin/dashBoard.jsx';
import { ManageBlog } from './page/pageAdmin/ManageBlog';
import { ManageCustomer } from './page/pageAdmin/ManageCustomer/ManageCustomer.jsx';
import { ManageStaff } from './page/pageAdmin/ManageStaff';
import { ManageSchedule } from './page/pageAdmin/ManageSchedule/ManageScheldule.jsx';
import { ManageOrder } from './page/pageAdmin/ManageOrder';
import {CreateNewCust} from './page/pageAdmin/CreateNewCust.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerApp />}>
          <Route index element={<HomeCustomer />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<HomeCustomer />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="evaluationservice" element={<EvaluationServicePage />} />
          <Route path="calculate" element={<Calculate />} />
          <Route path="check" element={<Check />} />
          <Route path="my-request" element={<PersonalRequest />} />
        </Route>
        <Route path="/staff" element={<StaffApp />}>
          <Route index element={<HomeStaff />} />
          <Route path="home" element={<HomeStaff />} />
          <Route path="user-request" element={<UserRequest />} />
          <Route path="view-receipt" element={<ViewReciptList />} />
          <Route path="view-receipt/:id" element={<ReceiptDetails />} />
          <Route path="create-receipt" element={<CreateReceipt />} />
          <Route path="commitment" element={<CreateCommitment />} />
          <Route path="personal-info" element={<PersonalInformation />} />
          <Route path="valuation" element={<ValuationApplication />} />
          {/* <Route path="valuation-result-list" element={<ValuationList />} /> */}
        </Route>
        <Route path="/admin" element={<AdminApp />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="manageblog" element={<ManageBlog />} />
          <Route path="managecustomer" element={<ManageCustomer />} />
          <Route path="managestaff" element={<ManageStaff />} />
          <Route path="manageschedule" element={<ManageSchedule />} />
          <Route path="manageorder" element={<ManageOrder />} />
          <Route path="createnewcust" element={<CreateNewCust />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
