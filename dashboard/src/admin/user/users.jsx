import { useEffect, useState } from 'react'
import AdminLayout from '../../component/admin_layout'
import { api, getAllUserByAdmin } from '../../config/api/api'

export default function AdminUsers() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [openMenu, setOpenMenu] = useState(null);
  const filteredUsers = userData.filter(
    user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveUser = async (userId) => {
    try {
      const response = await api.delete(`/admin/removeUser/${userId}`, {
        withCredentials: true,
      });
      console.log('User removed successfully:', response.data);
      // console.log("Remove user:", user.user_id);

      setOpenMenu(null);
      const updatedUsers = await getAllUserByAdmin();
      setUserData(updatedUsers);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }


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
                  filteredUsers.map((user, index) => (
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
                        {/* <button className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer transition-colors">
                          View
                        </button> */}
                        <td className="px-6 py-4 relative">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === index ? null : index)
                            }
                            className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer transition-colors"
                          >
                            View
                          </button>

                          {openMenu === index && (
                            <div className="absolute right-6 top-12 z-50 w-32 rounded-lg border border-border bg-background shadow-lg">
                              <button
                                onClick={() => {
                                  console.log("Edit user:", user.user_id);
                                  setOpenMenu(null);
                                }}
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-secondary/50 transition-colors"
                              >
                                Edit
                              </button>

                              <button
                              onClick={()=> handleRemoveUser(user.user_id)}
                                className="block w-full px-4 py-2 text-left text-sm text-destructive hover:bg-secondary/50 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </td>
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
