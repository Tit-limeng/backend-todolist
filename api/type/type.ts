import { Response  } from "express"
export type Message = {
    res : Response 
    status : number ,
    message : string ,
    data : unknown[] | [],
    error : unknown
}