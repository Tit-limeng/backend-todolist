
import AdminSidebar from './admin_sidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 bg-background min-h-screen">
        {children}
      </main>
    </div>
  )
}
