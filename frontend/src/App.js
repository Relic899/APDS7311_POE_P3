import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from "./components_POE/navbar";
import PaymentDashboard from "./components_POE/paymentDashboard";
import UserLogin from "./components_POE/userLogin";
import UserRegistration from "./components_POE/userRegistration";
import StaffLogin from "./components_POE/staffLogin";
import TransactionVerificationPortal from "./components_POE/transactionVerificationPortal";
import PaymentConfirmation from "./components_POE/paymentConfirmation";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<UserLogin />} />
          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/paymentDashboard" element={<PaymentDashboard />} />
          <Route path="/paymentConfirmation" element={<PaymentConfirmation />} />
          <Route path="/staffLogin" element={<StaffLogin />} />
          <Route path="/transactionVerificationPortal" element={<TransactionVerificationPortal />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;