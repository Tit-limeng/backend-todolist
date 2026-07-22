import { createUser, getUser, login ,googleLogin, userEdit , userLogout , forgotPassword, verifyOtp , updatePassword  } from '../../controller/user/auth.controller';
import { Authentication, authMiddleware } from '../../middleware/auth.middleware';
import { Express } from 'express';
const auth = (app: Express) => {
    app.post('/api/user/create', createUser);
    app.get('/api/user/get', Authentication("USER"), getUser);
    app.post('/api/user/login', login);
    app.post('/api/user/login/google' ,googleLogin ) ;
    app.patch('/api/user/edit/:id',Authentication("USER") , userEdit) ;
    app.post('/api/user/logout', userLogout) ;
    app.post("/api/user/forgot-password" , forgotPassword) ;
    app.post("/api/user/forgot-password/verify" , verifyOtp) ;
    app.patch("/api/user/forgot-password/updatePassword/:user_id" , updatePassword) ;
    app.get("/api/auth/check", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
    });
});
}

export default auth;