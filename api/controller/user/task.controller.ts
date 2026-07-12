import { Request, Response } from "express";
import { messageResponse } from "../../response/response.message";
import { pool } from "../../connection/db.connection";

export const userAddList = async (req: Request, res: Response) => {
    try {
        const user_id = ( req as any ).user.id ;
        console.log(user_id) ;
        const {title , description ,status ,priority , due_date} = req.body ;
        const query = ` INSERT INTO todos(user_id,title,description,status,priority,due_date) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
        const resultAddTask = await pool.query(query ,[user_id , title , description , status , priority , due_date]) ;
        return resultAddTask ? messageResponse({ res, status: 201, message: "data has been saved !", data: resultAddTask.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });

    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}


export const userEditTask = async (req : Request , res : Response ) => {
    try {
        const user_id = ( req as any ).user.id ;
        console.log(user_id) ;
        const {todo_id} = req.params ;
        const {title , description ,status ,priority , due_date} = req.body ;
        const query = `UPDATE todos SET title=$1,description=$2,status=$3,priority=$4,due_date=$5 WHERE user_id=$6 AND todo_id = $7 RETURNING * `;
        const resultEditTask = await pool.query(query ,[title , description , status , priority , due_date ,user_id , todo_id]) ;
         if (resultEditTask.rowCount === 0) {
            return messageResponse({
                res,
                status: 404,
                message: "Task not found.",
                data: [],
                error: true,
            });
        }
        return resultEditTask ? messageResponse({ res, status: 200, message: "data has been updated !", data: resultEditTask.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}

export const userGetTask = async (req : Request , res : Response ) => {
    const user_id = ( req as any ).user.id ;
    // const {todo_id} = req.params ;
    try {
        const query = `SELECT * FROM todos WHERE user_id=$1 ORDER BY created_at DESC`;
        const resultGetTask = await pool.query(query ,[user_id]) ;
        if (resultGetTask.rowCount === 0) {
            return messageResponse({
                res,
                status: 404,
                message: "Task not found yet.",
                data: [],
                error: true,
            });
        }

        return resultGetTask ? messageResponse({ res, status: 200, message: "data has been fetched !", data: resultGetTask.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}

export const userDeleteTask = async (req : Request , res : Response ) => {
    const user_id = ( req as any ).user.id ;
    const {todo_id} = req.params ;
    try {
        const query = `DELETE FROM todos WHERE user_id=$1 AND todo_id=$2 RETURNING *`;
        const resultDeleteTask = await pool.query(query ,[user_id , todo_id]) ;
        if (resultDeleteTask.rowCount === 0) {
            return messageResponse({
                res,
                status: 404,
                message: "Task not found.",
                data: [],
                error: true,
            });
        }
        return resultDeleteTask ? messageResponse({ res, status: 200, message: "data has been deleted !", data: resultDeleteTask.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}   