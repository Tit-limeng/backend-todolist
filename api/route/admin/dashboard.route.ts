import { Express } from "express"
import { Authentication } from "../../middleware/auth.middleware";
import { userCount ,taskCount , completedTaskCount ,pendingTaskCount ,getUserTask ,topUserTask} from "../../controller/admin/task.controller";
const dashboard = (app : Express) => {
    app.get('/api/admin/userCount' , Authentication("ADMIN") ,userCount) ;
    app.get('/api/admin/taskCount' , Authentication("ADMIN") ,taskCount) ;
    app.get('/api/admin/taskCompletedCount' , Authentication("ADMIN") ,completedTaskCount) ;
    app.get('/api/admin/taskPendingCount' , Authentication("ADMIN") ,pendingTaskCount) ;
    app.get('/api/admin/getUserTask' , Authentication("ADMIN") , getUserTask) ;
    app.get('/api/admin/getTopUserTask' , Authentication("ADMIN") , topUserTask) ;
    
}

export default dashboard