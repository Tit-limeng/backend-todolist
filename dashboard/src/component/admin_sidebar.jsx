
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from '../config/api/api';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Tasks', href: '/admin/tasks', icon: '✓' },
]

export default function AdminSidebar() {
  const pathname = useLocation()
  const navigate = useNavigate();
  const adminLogout = async () => {
    try {
      const logout = await logoutUser();
      console.log("Logout response:", logout);

      if (!logout?.error) {
        toast.success("logout successfully") ;
        console.log("Logout successful");
        setTimeout(() => {
        navigate("/auth/admin/login", { replace: true });
        }, 1000);
      } else {
        console.error("Logout failed:", logout?.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
    <Toaster
  position="bottom-right"
  reverseOrder={false}
  toastOptions={{
    iconTheme: {
        primary: "#ffffff",
        secondary: "#f11946",
      },
    style: {
      zIndex: 9999,
      color : "#ffffff",
      backgroundColor : "#f11946"
    },
  }}
/>
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">TaskFlow Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-300 hover:bg-primary'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-800/50">
        <button
          onClick={adminLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:text-primary text-slate-300 transition-colors"
        >
          <span>←</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>

  )
}
