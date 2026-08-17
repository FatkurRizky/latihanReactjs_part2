import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cashier from './pages/Cashier';
import Admin from './pages/Admin';
import Login from './pages/Login';
import History from './pages/History'; // <-- TAMBAHAN
import axios from 'axios';
import { AdminProductProvider } from './contexts/AdminProductContext';

const token = localStorage.getItem('admin_token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin_token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cashier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminProductProvider> <Admin/></AdminProductProvider></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}