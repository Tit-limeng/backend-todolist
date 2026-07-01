import { Message } from '../type/type';
import { Response } from 'express';

export const messageResponse = ({res ,status ,message, data ,error } : Message) => {

// if (!status) {
//   return ;
// }

return status ?  res.status(status).json({ message , data , error}) : res.status(500).json({ message: "Invalid status" });

}