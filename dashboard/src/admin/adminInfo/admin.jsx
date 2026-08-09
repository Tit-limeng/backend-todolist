
import { useState } from "react";
import AdminLayout from "../../component/admin_layout";

export default function AdminDetails() {
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [role, setRole] = useState("1");
    const handleAddRole = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Role added:", role);
        setShowRoleForm(false);
    }
    return (
        <AdminLayout>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Admin Information</h1>
                    <p className="text-muted-foreground">Manage and monitor admin information</p>
                </div>
                {/* Header */}
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
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
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