import { Request, Response } from "express";
import { messageResponse } from "../../response/response.message";
import { pool } from "../../connection/db.connection";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = process.env.JWT_SECRET_KEY;

        if (!email || !password) {
            return messageResponse({ res, status: 404, message: "email and password is required", data: [], error: true });
        }


        const query = ` SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE users.email = $1 AND users.role_id = 1`;
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
        const access_token = jwt.sign({ id: user.user_id, role: user.role }, token, { expiresIn: '30d' });
        const { password: _, ...userData } = user;

        res.cookie("token", access_token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, 
        });

        res.status(200).json({
            message: 'Login successful',
            error: false,
            user: userData,
            access_token: access_token
        });
    } catch (error) {

        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });

    }
}


//get admin info

export const getAdminInfo = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id;
        const query = `SELECT * FROM users WHERE user_id=$1 AND role_id=1`;
        const resultGetAdminInfo = await pool.query(query, [user_id]);
        if (resultGetAdminInfo.rowCount === 0) {
            return messageResponse({
                res,
                status: 404,
                message: "Admin not found.",
                data: [],
                error: true,
            });
        }
        return resultGetAdminInfo ? messageResponse({ res, status: 200, message: "get admin info successful", data: resultGetAdminInfo.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}   