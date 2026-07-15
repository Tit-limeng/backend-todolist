import { useEffect, useState } from 'react'
import AdminLayout from '../../component/admin_layout'
import { getAllUserByAdmin } from '../../config/api/api'

// Mock user data
// const mockUsers = [
//   { id: 1, name: 'Alex Morgan', email: 'alex@example.com', status: 'active', joinDate: 'Jan 15, 2024', tasks: 12 },
//   { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', joinDate: 'Feb 3, 2024', tasks: 8 },
//   { id: 3, name: 'Jordan Smith', email: 'jordan@example.com', status: 'active', joinDate: 'Jan 28, 2024', tasks: 15 },
//   { id: 4, name: 'Sam Wilson', email: 'sam@example.com', status: 'inactive', joinDate: 'Mar 10, 2024', tasks: 5 },
//   { id: 5, name: 'Casey Brown', email: 'casey@example.com', status: 'active', joinDate: 'Feb 22, 2024', tasks: 9 },
//   { id: 6, name: 'Taylor Davis', email: 'taylor@example.com', status: 'active', joinDate: 'Mar 5, 2024', tasks: 7 },
// ]
// const statusColors = {
//   completed: 'bg-primary text-green-100',
//   pending: 'bg-gray-100 text-gray-800',
// }

export default function AdminUsers() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = userData.filter(
    user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

 
  useEffect(() => {
     const allUser = async () => {
    const data = await getAllUserByAdmin();
    setUserData(data);
  }

    allUser();
  }, [])
  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Users Management</h1>
          <p className="text-muted-foreground">Manage and monitor all registered users</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th> */}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tasks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user , index) => (
                    <tr key={index} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{user.username}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{user.email}</td>
                      {/* <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status]
                            }`}
                        >
                          {user.status && (
                            user.status.charAt(0).toUpperCase() + user.status.slice(1)
                          )}
                        </span>
                      </td> */}
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                          {new Date(user.user_created_at).toLocaleDateString()}
                        </td>
                      <td className="px-6 py-4 text-foreground font-medium">{user.total_todos}</td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {filteredUsers.length} users
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
