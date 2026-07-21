import { pool } from "../../connection/db.connection"
import { Request, Response } from "express"
import { messageResponse } from "../../response/response.message";

export const userCount = async (req: Request, res: Response) => {
    try {
        const query = `SELECT COUNT(user_id) FROM users`;
        const result = await pool.query(query);

        if (result.rows) return messageResponse({ res, status: 200, message: "get data user cound successfully", data: result.rows[0], error: false });
        return messageResponse({ res, status: 404, message: "data not found", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [error], error: true });

    }
}

//count all task

export const taskCount = async (req: Request, res: Response) => {
    try {
        const query = `SELECT COUNT(todo_id) FROM todos`;
        const result = await pool.query(query);

        if (result.rows) return messageResponse({ res, status: 200, message: "get data task count successfully", data: result.rows[0], error: false });
        return messageResponse({ res, status: 404, message: "data not found", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [error], error: true });

    }
}

export const completedTaskCount = async (req: Request, res: Response) => {
    try {
        const query = `SELECT COUNT(todo_id) FROM todos WHERE status='completed'`;
        const result = await pool.query(query);

        if (result.rows) return messageResponse({ res, status: 200, message: "get data task completed count successfully", data: result.rows[0], error: false });
        return messageResponse({ res, status: 404, message: "data not found", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [error], error: true });

    }
}


export const pendingTaskCount = async (req: Request, res: Response) => {
    try {
        const query = `SELECT COUNT(todo_id) FROM todos WHERE status='pending'`;
        const result = await pool.query(query);

        if (result.rows) return messageResponse({ res, status: 200, message: "get data task completed count successfully", data: result.rows[0], error: false });
        return messageResponse({ res, status: 404, message: "data not found", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [error], error: true });

    }
}

//get all task user by admin

export const getUserTask = async (req: Request, res: Response) => {
    try {
        const query = `SELECT todos.* , users.* FROM todos INNER JOIN users ON todos.user_id = users.user_id ORDER BY todos.created_at DESC`;
        const result = await pool.query(query);
        return result ? messageResponse({ res, status: 200, message: "get user task successfully", data: result.rows, error: false }) : messageResponse({ res, status: 404, message: "user task not found", data: [], error: true })
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [error], error: true });
    }
}

//get 5 user that the most tasks 
export const topUserTask = async (req : Request , res : Response) => {
    // const query = `SELECT * FROM todos LEFT JOIN users ON users.user_id = todos.user_id `;
   try {

        const query = `
    SELECT
        u.user_id,
        u.username,
        COUNT(t.todo_id) AS task_count
    FROM users u
    LEFT JOIN todos t
        ON u.user_id = t.user_id
    GROUP BY u.user_id, u.username
    ORDER BY task_count DESC
    LIMIT 5;
    `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
        return messageResponse({
            res,
            status: 404,
            message: "No users found",
            data: [],
            error: true,
        });
        }
    return result ? messageResponse({ res, status: 200, message: "get top user task successfully", data: result.rows, error: false }) : messageResponse({ res, status: 404, message: "user task not found", data: [], error: true })

   } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [error], error: true });
   }
}