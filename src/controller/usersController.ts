import { Request, Response } from 'express';
import User from "../models/User"
import jwt from "jsonwebtoken"
import authConfig from "../config/authConfig.json"


class UsersController {
    
    async getDataDb(req: Request, res: Response){
        const id = req.params.id;
        const result = await User.findOne({ where: { id: id}});
        if(!result){
            res.status(204).send();
            return;
        } 
        return res.json(result).status(200);
    }    
    async postDataDb(req: Request, res: Response){
        const data = req.body;
        const result = await User.findOne({ where : { user: data.user }});
        if(result){
            res.status(400).send({msg: "Usuário ja existe."});
            return;
        }
        await User.create(data);
        return res.status(201).send({msg: "Usuário cadastrado."});
    }
    async postDataLogin(req: Request, res: Response){
        const data = req.body;
        const result = await User.findOne({ where: { user: data.user, pass: data.pass}});
        if(!result) {
            res.status(401).send({msg: "Usuário ou senha inválidos."});
            return;
        }
        const token = jwt.sign({
            user: data.user,
            pass: data.pass
        }, authConfig.secret,
        {
            expiresIn: "1h"
        });
        return res.status(200).send({
            msg: "Autenticado",
            token: token
        })
    }
    async getAllDataDb(_req: Request, res: Response){
        const data = await User.findAll();
        if(data.length == 0){
            res.status(204).send({msg: "Sem registros."});
            return;
        }
        return res.status(200).send(data)
    }
    async putDataDb(req: Request, res: Response){
        const id = req.params.id;
        const user = await User.findOne({ where: { id: id}});
        user.user = req.body.user;
        user.pass = req.body.pass;
        await user.save();
        return res.status(200).send({msg: "Usuário atualizado."})
    }    
    async delDataDb(req: Request, res: Response){
        const id = req.params.id;
        await User.destroy({ where: { id: id}})
        return res.status(200).send({msg: "Usuário deletado."})
    }    
}

export default new UsersController();