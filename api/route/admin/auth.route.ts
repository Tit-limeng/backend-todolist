import { Express } from "express"
import { login ,getAdminInfo} from "../../controller/admin/auth.controller";
import { Authentication } from "../../middleware/auth.middleware";
const auth = ( app : Express ) => {
    app.post('/api/admin/login' , login);
    app.get('/api/admin/getInfo' ,Authentication("ADMIN"), getAdminInfo);
}

export default auth ;