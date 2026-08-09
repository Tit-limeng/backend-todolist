
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/Dashboard';
import AdminUsers from './admin/user/users';
import AdminTasks from './admin/task/tasks';
import './index.css'
import AdminLoginPage from './auth/login/LogIn';
import NotFound from '../Not_Found';
import { GuestRoute, ProtectedRoute } from './config/middleware/protected_route';
import AdminInfo from './admin/adminInfo/admin';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route element={<GuestRoute />}>
          <Route 
            path="/auth/admin/login" 
            element={<AdminLoginPage />} 
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin/tasks" element={<AdminTasks />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/info" element={<AdminInfo />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App
