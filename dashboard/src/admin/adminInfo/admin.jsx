
import { useState ,useEffect} from "react";
import AdminLayout from "../../component/admin_layout";
import {api ,getAllByAdmin} from "../../config/api/api";
export default function AdminDetails() {
    const [showRoleForm, setShowRoleForm] = useState(false);
    const listBar = ["Username", "Email" , "Role" ,"Created At","Action"] ;
    const [adminData, setAdminData] = useState([]);
    // const [role, setRole] = useState("1");
    const [data , setData] = useState({
        username: "",
        email: "",
        password: "",
        role_id: ""
    });
    const handleAddRole = async (e) => {
        e.preventDefault();
        const response = await api.post("/admin/newRole" , {
            username: data.username,
            email: data.email,
            password: data.password,
            role_id: data.role_id
        } , { withCredentials: true });
        
       if ( response.status === 200 ) {
        console.log("Role added:", data.role_id);
        setShowRoleForm(false);
        console.log(response.data.message , response.data.data);
       }
       
    }

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const adminData = await getAllByAdmin();
                console.log("Admin Data:", adminData);
                setAdminData(adminData);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };
        fetchAdminData();
    }, []);

    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Admin Information</h1>
                    <p className="text-muted-foreground">Manage and monitor admin information</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                        Admin Details
                    </h2>

                    <button
                        onClick={() => setShowRoleForm(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 
                     focus:ring-2 focus:ring-primary focus:ring-offset-2 
                     py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                        Add Role
                    </button>
                </div>

                <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  {
                    listBar.map((i,index) => (
                  <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-foreground">{i}</th>

                    ))
                  }
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Task Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {adminData.length > 0 ? (
                  adminData.map((user, index) => (
                    <tr key={index} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{user.username}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        {/* <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]
                            }`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                        </span> */}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                            ${user.role_id === 1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"  }`}
                        >
                          {user.role_id === 1 ? "Admin" : "User"}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium 
                            `}
                        >
                          View
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

                {showRoleForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">


                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-semibold">
                                    Add Role
                                </h3>

                                <button
                                    onClick={() => setShowRoleForm(false)}
                                    className="text-muted-foreground hover:text-foreground text-xl"
                                >
                                    ×
                                </button>
                            </div>

                            <form
                                onSubmit={handleAddRole}
                                className="space-y-4"
                            >

                                {/* <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                    </label>

                                    <textarea
                                        placeholder="Enter role description"
                                        rows={3}
                                        className="w-full rounded-md border border-input 
                             bg-background px-3 py-2 text-sm 
                             outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        User Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="username"
                                        value={data.username}
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                        className="w-full rounded-md border border-input 
                             bg-background px-3 py-2 text-sm 
                             outline-none focus:ring-2 focus:ring-primary"
                                    />

                                </div>


                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Email
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="example@gmail.com"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        className="w-full rounded-md border border-input 
                             bg-background px-3 py-2 text-sm 
                             outline-none focus:ring-2 focus:ring-primary"
                                    />


                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Password
                                    </label>

                                    <input
                                
                                        type="password"
                                        placeholder="Enter Password"
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        className="w-full rounded-md border border-input 
                             bg-background px-3 py-2 text-sm 
                             outline-none focus:ring-2 focus:ring-primary"
                                    />


                                </div>

                                 <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Role Name
                                    </label>
                                    <select
                                        value={data.role_id}
                                        onChange={(e) => setData({ ...data, role_id: e.target.value })}
                                        className="px-4 py-2 w-full rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="1">Admin</option>
                                        <option value="2">User</option>
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowRoleForm(false)}
                                        className="rounded-md border px-4 py-2 text-sm font-medium"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-md bg-primary px-4 py-2 
                             text-sm font-medium text-primary-foreground 
                             hover:bg-primary/90"
                                    >
                                        Add Role
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}