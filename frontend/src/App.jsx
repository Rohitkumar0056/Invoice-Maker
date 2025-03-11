import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Container from './components/Container';
import DashBoard from './pages/DashBoard';
import Create from './components/Create';
import Invoices from './pages/Invoices';
import InvoiceDetails from './pages/InvoiceDetails';
import EditInvoice from './pages/EditInvoice';
import ClientList from './pages/ClientList';

function App() {

  return (
    <BrowserRouter>
      <div className="bg-gray-300">
        <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<Container><DashBoard /></Container>} />
            <Route path='/create' element={<Container><Create /></Container>} />
            <Route path='/invoices' element={<Container><Invoices /></Container>} />
            <Route path="/invoice/:id" element={<Container><InvoiceDetails /></Container>} />
            <Route path="/edit/invoice/:id" element={<Container><EditInvoice /></Container>} />
            <Route path="/customers" element={<Container><ClientList /></Container>} />
          </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
