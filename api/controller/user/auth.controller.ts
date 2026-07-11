import { Request, Response } from 'express';
import { pool } from '../../connection/db.connection';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { messageResponse } from '../../response/response.message';
import nodeMailer from 'nodemailer'

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const newPassword = await bcrypt.hash(password, 10);

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return messageResponse({ res, status: 400, message: "User already exist ", data: [], error: true });
        }
        const query = `INSERT INTO users(username,email , password,role_id,login) VALUES($1,$2,$3,2,'true') RETURNING *`;
        const resultNewUser = await pool.query(query, [username, email, newPassword]);

        if (resultNewUser) {
            // sent otp code 
            const user = resultNewUser.rows[0] ;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = new Date(Date.now() + 3 * 60 * 1000);

            const otpCodeSend = `INSERT INTO email_otp(user_id , otp_code,expires_at) VALUES($1,$2,$3) RETURNING *`;

            const otpVerify = await pool.query(otpCodeSend, [user.user_id, otp, expires]);

            if (otpVerify.rows.length === 0) return res.status(500).json({ message: 'Failed to create new OTP' });

            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                }
            });
            // console.log(otpVerify.rows);
            transporter.sendMail({
                from: `"Todo List app" <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Your New OTP Code',
                text: `Your new OTP is ${otp}. It will expire in 3 minutes.`,
            }, (mailErr) => {
                if (mailErr) {
                    return res.status(500).json({ message: 'Failed to send email', mailErr });
                }

                res.json({ message: 'OTP sent successfully', user_id: user.user_id });
            });
        }

        return resultNewUser ? messageResponse({ res, status: 201, message: " new user has been created ", data: resultNewUser.rows, error: false }) : messageResponse({ res, status: 500, message: "internal server error", data: [], error: true });
    } catch (error) {
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


        const query = ` SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE users.email = $1 AND users.role_id = 2 AND users.login=true`;
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
            // maxAge : 1 * 60 * 1000 ,
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
        const { username } = req.body;
        const user_id = (req as any).user.id;
        console.log("USER ID IS ", user_id);
        // const newPassword = await bcrypt.hash(password, 10);
        const query = ` UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *`;
        const resultEdit = await pool.query(query, [username, user_id]);
        return resultEdit ? messageResponse({ res, status: 200, message: "data has been updated !", data: resultEdit.rows, error: false }) : messageResponse({ res, status: 404, message: "data not found ", data: [], error: true });
    } catch (error) {
        return messageResponse({ res, status: 500, message: "internal server error", data: [], error: error });
    }
}

// forgot password and resend Otp 
export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const query = `SELECT * FROM users WHERE email = $1`;
    const resualt = await pool.query(query, [email]);

    if (resualt.rows.length === 0) return messageResponse({ res, status: 404, message: "Email doesn't exist ! ", data: [], error: true });

    const data = resualt.rows[0];

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 3 * 60 * 1000);

    const otpCodeSend = `INSERT INTO email_otp(user_id , otp_code,expires_at) VALUES($1,$2,$3) RETURNING *`;

    const otpVerify = await pool.query(otpCodeSend, [data.user_id, otp, expires]);

    if (otpVerify.rows.length === 0) return res.status(500).json({ message: 'Failed to create new OTP' });

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }
    });
    console.log(data);
    transporter.sendMail({
        from: `"Todo List app" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: 'Your New OTP Code',
        text: `Your new OTP is ${otp}. It will expire in 3 minutes.`,
    }, (mailErr) => {
        if (mailErr) {
            return res.status(500).json({ message: 'Failed to send email', mailErr });
        }

        res.json({ message: 'OTP sent successfully', user_id: data.user_id });
    });

}



//  verify otp from email code send 
// export const verifyOtp = async (req  : Request , res : Response ) => {
//     const  { email ,otp}  = req.body ;

//     const query = `SELECT users.* , email_otp.* from users INNER JOIN email_otp ON users.user_id = email_otp.user_id WHERE users.email = $1 `;

//     const getdataQuery = await pool.query(query , [email]) ;

//     if ( getdataQuery.rows.length === 0 ) return res.status(404).json({message : "email does not exist !"}) ;
//     const user = getdataQuery.rows[0] ;
//     console.log(user);
//     const user_id = user.user_id;
//     console.log("this is user id :" , user_id) ;
//     const otp_code = user.otp_code;
//     console.log("otp code is : " , otp_code) ;

//     const queryEmailOtp = ` SELECT * FROM email_otp WHERE user_id = $1 AND otp_code = $2 AND expires_at > NOW() ORDER BY created_at DESC
//             LIMIT 1` ;
//     const result = await pool.query(queryEmailOtp ,[user_id , otp_code]) ;
//     if ( result.rows.length === 0 ) return messageResponse({res,status : 404 ,message: 'Invalid or expired OTP' , data : result.rows[0],error : true })

//     return messageResponse({res , status : 200 , message : "OTP verified successfully!" , data : result.rows[0] , error : false})

// }

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        const query = `
            SELECT users.user_id, users.email
            FROM users
            WHERE users.email = $1
        `;

        const userResult = await pool.query(query, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                message: "Email does not exist!"
            });
        }

        const user = userResult.rows[0];

        const user_id = user.user_id;
        console.log("this table user : ", user_id);

        const otpQuery = `
            SELECT *
            FROM email_otp
            WHERE user_id = $1 
            AND otp_code = $2 
            AND expires_at > NOW()
            ORDER BY created_at DESC
            LIMIT 1
        `;

        const otpResult = await pool.query(otpQuery, [
            user_id,
            otp
        ]);

        console.log("email:", email);
        console.log("input otp:", otp);
        console.log("user_id:", user_id);

        if (otpResult.rows.length === 0) {
            return messageResponse({
                res,
                status: 404,
                message: "Invalid or expired OTP",
                data: [],
                error: true
            });
        }


        await pool.query(
            `
            UPDATE users 
            SET verify = TRUE
            WHERE user_id = $1 
            `,
            [otpResult.rows[0].user_id]
        );


        return messageResponse({
            res,
            status: 200,
            message: "OTP verified successfully!",
            data: otpResult.rows[0],
            error: false
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    const newPassword = await bcrypt.hash(password, 10)
    const user_id = req.params.user_id;
    const query = `UPDATE users SET password = $1 ,login = 'true' WHERE email = $2 AND user_id = $3 RETURNING * `;
    const resualt = await pool.query(query, [newPassword, email, user_id]);
    if (resualt.rows.length === 0) return messageResponse({ res, status: 404, message: "this user doesn't exist !", data: [], error: true });
    return messageResponse({ res, status: 200, message: "password has been updated !", data: resualt.rows[0], error: true });
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


