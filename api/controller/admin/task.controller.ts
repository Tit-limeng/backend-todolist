import { pool } from "../../connection/db.connection"
import { Request , Response } from "express"
import { messageResponse } from "../../response/response.message";

export const userCount = async (req : Request , res : Response) => {
    try {
        const query = `SELECT COUNT(user_id) FROM users`;
        const result = await pool.query(query) ;

        if ( result.rows ) return messageResponse({res , status : 200 , message : "get data user cound successfully" , data : result.rows[0] , error : false});
        return messageResponse({res , status : 404 , message : "data not found" , data : [], error : true});
    } catch (error) {
        return messageResponse({res , status : 500 , message : "internal server error" , data : [error] , error : true});
        
    }
}

//count all task

export const taskCount = async (req : Request , res : Response) => {
    try {
        const query = `SELECT COUNT(todo_id) FROM todos`;
        const result = await pool.query(query) ;

        if ( result.rows ) return messageResponse({res , status : 200 , message : "get data task count successfully" , data : result.rows[0] , error : false});
        return messageResponse({res , status : 404 , message : "data not found" , data : [], error : true});
    } catch (error) {
        return messageResponse({res , status : 500 , message : "internal server error" , data : [error] , error : true});
        
    }
}

export const completedTaskCount = async (req : Request , res : Response) => {
    try {
        const query = `SELECT COUNT(todo_id) FROM todos WHERE status='completed'`;
        const result = await pool.query(query) ;

        if ( result.rows ) return messageResponse({res , status : 200 , message : "get data task completed count successfully" , data : result.rows[0] , error : false});
        return messageResponse({res , status : 404 , message : "data not found" , data : [], error : true});
    } catch (error) {
        return messageResponse({res , status : 500 , message : "internal server error" , data : [error] , error : true});
        
    }
}


export const pendingTaskCount = async (req : Request , res : Response) => {
    try {
        const query = `SELECT COUNT(todo_id) FROM todos WHERE status='pending'`;
        const result = await pool.query(query) ;

        if ( result.rows ) return messageResponse({res , status : 200 , message : "get data task completed count successfully" , data : result.rows[0] , error : false});
        return messageResponse({res , status : 404 , message : "data not found" , data : [], error : true});
    } catch (error) {
        return messageResponse({res , status : 500 , message : "internal server error" , data : [error] , error : true});
        
    }
}