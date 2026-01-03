import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateRestaurant from './components/UpdateRestaurant';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/restaurants/update/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <UpdateRestaurant />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;