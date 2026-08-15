import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
// app.use(cors());
// app.use(cookieParser());
// app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors({
    // origin: ['https://frontend-todolist-lw8w5lzaz-tit-limengs-projects.vercel.app'],
    origin: ['*'],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
import userRoute from './route/user/auth.route';
userRoute(app);

import adminRoute from './route/admin/auth.route';
adminRoute(app);

import userOnTask from './route/user/task.route';
userOnTask(app) ;

//admin dashboard 

import dashboard  from './route/admin/dashboard.route';
dashboard(app) ;

app.get('/api/user', (req: Request, res: Response) => {
    return res.send("hello");
})
console.log("hello world");

app.listen(PORT, () => { console.log('this is port listen:', PORT) });