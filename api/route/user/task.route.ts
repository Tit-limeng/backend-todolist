import { Express } from "express"
import { Authentication } from "../../middleware/auth.middleware";
import { userAddList, userEditTask ,userGetTask , userDeleteTask } from "../../controller/user/task.controller";

const userOnTask = ( app : Express ) => {
    app.post('/api/user/task/addTask' , Authentication("USER") ,userAddList );
    app.patch('/api/user/task/editTask/:todo_id' , Authentication("USER") ,userEditTask);
    app.get('/api/user/task/getTask/' , Authentication("USER") ,userGetTask);
    app.delete('/api/user/task/deleteTask/:todo_id' , Authentication("USER") ,userDeleteTask);
}

export default userOnTask ;