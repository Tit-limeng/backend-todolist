import { createUser, getUser, login , userEdit , userLogout } from '../../controller/user/auth.controller';
import { Authentication } from '../../middleware/auth.middleware';
import { Express } from 'express';
const auth = (app: Express) => {
    app.post('/api/user/create', createUser);
    app.get('/api/user/get', Authentication("USER"), getUser);
    app.post('/api/user/login', login);
    app.patch('/api/user/edit/:id',Authentication("USER") , userEdit) ;
    app.post('/api/user/logout',Authentication("USER") , userLogout) ;
}

export default auth;