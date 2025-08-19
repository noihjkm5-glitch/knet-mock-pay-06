import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PaymentPage from './pages/PaymentPage';
import NBKPaymentPage from './App';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Dashboard - Link Generator (default page) */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Payment page with ID parameter */}
        <Route path="/pay/:id" element={<PaymentPage />} />
        
        {/* NBK Payment Flow */}
        <Route path="/nbk" element={<NBKPaymentPage />} />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;