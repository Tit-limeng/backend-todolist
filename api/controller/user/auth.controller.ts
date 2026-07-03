import { Request, Response } from 'express';
import { pool } from '../../connection/db.connection';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { messageResponse } from '../../response/response.message';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const newPassword = await bcrypt.hash(password, 10);

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            // return res.status(400).json({
            //     message: "User already exists",
            // });
            return messageResponse({ res, status: 400, message: "User already exist ", data: [], error: true });
        }
        const query = `INSERT INTO users(username,email , password,role_id) VALUES($1,$2,$3,2)`;
        const resultNewUser = await pool.query(query, [username, email, newPassword]);

        return resultNewUser ? messageResponse({ res, status: 201, message: " new user has been created ", data: resultNewUser.rows, error: false }) : messageResponse({ res, status: 500, message: "internal server error", data: [], error: true });
    } catch (error) {
        // return res.status(500).json({ message: "internal server error", error: error });
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error })
    }
}

//user login 
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = process.env.JWT_SECRET_KEY;

        if (!email || !password) {
            return messageResponse({ res, status: 404, message: "email and password is required", data: [], error: true });
        }


        const query = ` SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE users.email = $1 AND users.role_id = 2`;
        const getUser = await pool.query(query, [email]);
        if (getUser.rows.length === 0)
            // return res.status(404).json({ message: "Email doesn't exist !", error: true });
            return messageResponse({ res, status: 404, message: "Email doesn't exist ! ", data: [], error: true })
        if (!getUser) {
            return messageResponse({ res, status: 404, message: "error something connection !", data: [], error: true });

        }
        const user = getUser.rows[0];
        const getEmail = getUser.rows[0].email;
        const cryptPassword = await bcrypt.compare(password, user.password)
        console.log(getEmail, user.role);

        if (!cryptPassword) {
            // return res.status(401).json({ message: "Invalid email or password.", error: true }) ;
            return messageResponse({ res, status: 401, message: "Invalid email or password", data: [], error: true });
        }

        if (!token) {
            throw new Error("Token Not Found !");
        }

        console.log("this is token in cookie", req.cookies.token);
        const access_token = jwt.sign({ id: user.user_id, role: user.role }, token, { expiresIn: '30d' });
        const { password: _, ...userData } = user;

        res.cookie("token", access_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, 
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Login successful',
            error: false,
            user: userData,
            access_token: access_token
        });
    } catch (error) {
        // return res.status(500).json({
        //     message: "internal server error",
        //     error: error,
        // }) ;
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });

    }
}


export const getUser = async (req: Request, res: Response) => {
    try {
        const users_id = (req as any).user.id;
        console.log(users_id);
        const query = `SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE users.user_id = $1`;
        const result = await pool.query(query, [users_id]);
        // return result ? res.status(200).json({ message: "get user successfully", data: result.rows }) : res.status(403).json({ message: "can not get user" });
        return result ? messageResponse({ res, status: 200, message: "get user successfully", data: result.rows, error: false }) : messageResponse({ res, status: 403, message: "can not get user", data: [], error: true })
    } catch (error) {
        // return res.status(500).json({ message: "internal server error", error: error });
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error })

    }
}


// edit user profile

export const userEdit = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user_id = (req as any).user.id;
        console.log("USER ID IS ", user_id);

        const query = ` UPDATE users SET username = $1 , password =$2 WHERE user_id = $3 RETURNING *`;
        const resultEdit = await pool.query(query, [username, password, user_id]);
        return resultEdit ? messageResponse({ res, status: 200, message: "data has been updated !", data: resultEdit.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}


export const userLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false, 
        });
        return messageResponse({ res, status: 200, message: "Logout successful", data: [], error: false });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}   


