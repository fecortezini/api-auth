import { Request, Response, Next } from 'express';
import jwt from "jsonwebtoken"
import authConfig from "../config/authConfig.json"

export default (req: Request, res: Response, next: Next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({msg: "Token nao fornecido."});
    }
    const parts = authHeader.split(' ');

    if(parts.length !== 2){
        return res.status(401).send({msg: "Token inválido."})
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({msg: "Token mal formatado."});
    }

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error) return res.status(401).send({msg: "Token inválido real."})
        req.user = decoded.user;
        req.pass = decoded.pass;
        return next();
    })
}
