import { useState } from 'react'
import AdminLayout from '../../component/admin_layout'

// Mock task data
const mockTasks = [
  { id: 1, title: 'Complete project proposal', user: 'Alex Morgan', status: 'completed', priority: 'high', createdAt: 'Mar 1, 2024' },
  { id: 2, title: 'Review team feedback', user: 'Sarah Johnson', status: 'in-progress', priority: 'high', createdAt: 'Mar 3, 2024' },
  { id: 3, title: 'Update documentation', user: 'Jordan Smith', status: 'pending', priority: 'medium', createdAt: 'Mar 5, 2024' },
  { id: 4, title: 'Schedule meeting', user: 'Sam Wilson', status: 'pending', priority: 'low', createdAt: 'Mar 6, 2024' },
  { id: 5, title: 'Fix bug in dashboard', user: 'Casey Brown', status: 'completed', priority: 'high', createdAt: 'Feb 28, 2024' },
  { id: 6, title: 'Prepare quarterly report', user: 'Taylor Davis', status: 'in-progress', priority: 'medium', createdAt: 'Mar 2, 2024' },
  { id: 7, title: 'Client presentation', user: 'Alex Morgan', status: 'pending', priority: 'high', createdAt: 'Mar 4, 2024' },
  { id: 8, title: 'Database optimization', user: 'Jordan Smith', status: 'completed', priority: 'medium', createdAt: 'Feb 25, 2024' },
]

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
}

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-orange-100 text-orange-800',
  low: 'bg-blue-100 text-blue-800',
}

export default function AdminTasks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') ;

  const filteredTasks = mockTasks.filter(
    task =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.user.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'all' || task.status === filterStatus)
  )

  const stats = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    inProgress: mockTasks.filter(t => t.status === 'in-progress').length,
    pending: mockTasks.filter(t => t.status === 'pending').length,
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tasks Monitoring</h1>
          <p className="text-muted-foreground">Monitor and track all user tasks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Tasks Table */}
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Task Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Priority</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{task.title}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{task.user}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[task.status]
                          }`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            priorityColors[task.priority]
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{task.createdAt}</td>
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

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTasks.length} of {mockTasks.length} tasks
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
