
import { useEffect, useState } from 'react'
import AdminLayout from '../component/admin_layout'
import StatCard from '../component/state_card'
import { getUserCount, getTaskCompletedCount, getTaskCount, getTaskPendingCount, getTopUserTask } from '../config/api/api'

// Mock data
const recentTasks = [
  { id: 1, user: 'Alex Morgan', task: 'Complete project proposal', status: 'completed', time: '2 hours ago' },
  { id: 2, user: 'Sarah Johnson', task: 'Review team feedback', status: 'in-progress', time: '30 mins ago' },
  { id: 3, user: 'Jordan Smith', task: 'Update documentation', status: 'pending', time: '5 mins ago' },
  { id: 4, user: 'Sam Wilson', task: 'Schedule meeting', status: 'pending', time: 'Just now' },
]

// const users = [
//   { id: 1, name: 'Alex Morgan', email: 'alex@example.com', tasks: 12 },
//   { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', tasks: 8 },
//   { id: 3, name: 'Jordan Smith', email: 'jordan@example.com', tasks: 15 },
//   { id: 4, name: 'Sam Wilson', email: 'sam@example.com', tasks: 5 },
// ]

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
}

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTasks, settotalTasks] = useState(0);
  const [completedTasks, setcompletedTasks] = useState(0);
  const [pendingTask, setPendingTasks] = useState(0);
  const [users, setUsers] = useState([]);
  // const  = users.reduce((sum, user) => sum + user.tasks, 0)
  // const completionRate = Math.round((completedTasks / totalTasks) * 100)

  useEffect(() => {
    const TotalUsers = async () => {
      const userCount = await getUserCount();
      setTotalUsers(userCount);
    }
    TotalUsers();
    const TotalTaskCount = async () => {
      const totalTaskCount = await getTaskCount();
      settotalTasks(totalTaskCount);
    }
    TotalTaskCount();
    const TotalTashCompletedCount = async () => {
      const totalTaskCompleted = await getTaskCompletedCount();
      setcompletedTasks(totalTaskCompleted);
    }
    TotalTashCompletedCount();
    const TotalTashPendingCount = async () => {
      const totalTaskPending = await getTaskPendingCount();
      setPendingTasks(totalTaskPending);
    }
    TotalTashPendingCount();
    const getTopUserTasks = async () => {
      const topUsers = await getTopUserTask();
      setUsers(topUsers);
    }
    getTopUserTasks()

  }, [])
  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon="👥"
          // trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            icon="✓"
          // trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Completed Tasks"
            value={completedTasks}
            icon="✅"
          // trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Pending Tasks"
            value={`${pendingTask}%`}
            icon="📈"
          // trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-6 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{task.task}</p>
                        <p className="text-sm text-muted-foreground mt-1">{task.user}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status] || statusColors.pending
                            }`}
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">{task.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Users */}
          <div>
            <div className="bg-card rounded-lg border border-border shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Top Active Users</h2>
              </div>
              <div className="divide-y divide-border">
                {users.map((user, index) => (
                  <div key={index} className="p-4 hover:bg-secondary/20 transition-colors">
                    <p className="font-medium text-foreground text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user.task_count} tasks</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
