import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './component/page/Blog';
import Calculate from './component/page/Calculate';
import Check from './component/page/Check';
import Home from './component/page/Home';
import Contact from './component/page/Contact';
import EvaluationServicePage from './component/page/EvaluationServicePage';
import Login from './component/page/Login';
import Signup from './component/page/Signup';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {/* Đổi thành home sau */}
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='home' element={<Home />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contact' element={<Contact />} />
          <Route path='evaluationservice' element={<EvaluationServicePage />} />
          <Route path='calculate' element={<Calculate />} />
          <Route path='check' element={<Check />} />
          {/* <Route path='policy' element={<Policy/>} />
          <Route path='type-of-valuation' element={<Check />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >
);


