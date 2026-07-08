import { createUser, getUser, login , userEdit , userLogout , forgotPassword, verifyOtp } from '../../controller/user/auth.controller';
import { Authentication, authMiddleware } from '../../middleware/auth.middleware';
import { Express } from 'express';
const auth = (app: Express) => {
    app.post('/api/user/create', createUser);
    app.get('/api/user/get', Authentication("USER"), getUser);
    app.post('/api/user/login', login);
    app.patch('/api/user/edit/:id',Authentication("USER") , userEdit) ;
    app.post('/api/user/logout', userLogout) ;
    app.post("/api/user/forgot-password" , forgotPassword) ;
    app.post("/api/user/forgot-password/verify" , verifyOtp) ;
    app.get("/api/auth/check", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
    });
});
}

export default auth;