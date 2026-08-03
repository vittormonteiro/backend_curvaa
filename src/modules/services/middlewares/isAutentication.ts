import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { notFound, unauthorized } from "../../../shared/errors/errorFactories";
import authConfig from '../../../shared/config/auth';
import {repository} from "./../../../shared/infra/typeorm/repositories/accessRepository";

interface TokenPayload{
    iat: number,
    exp:number,
    sub:string,
    aud:string
};

//Criando autenticação para colocar nas rotas
export default async function isAutentication (request:Request, response:Response, next: NextFunction): Promise<void>{
    
    //De onde virao token dentro de headers
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw unauthorized('JWT faltando token')
    }

    //Bearer -  quebrando a string [0] bearer [1] token
    const token = authHeader.split(' ')[1];
    
    try{
        //Verificando o token e a secret ( Ele vai verificar se o token foi criado com a secret)
        const decodeToken = verify( token , authConfig.jwt.secret);

        //Sub é o ID do usuario
        const {sub, aud} = decodeToken as TokenPayload;

        const content = await repository.findOneBy({uuidusuario: sub});

        if(!content){
            throw notFound();
        }

        if(content.token_at != token){
            throw unauthorized();
        }

        content.last_log = new Date();
        
        await repository.save(content);

        //Reescrevendo a função requests dentro da pasta @types / express
        request.user = {
            uuidusuario: sub,
            uuidlicenca: content.uuidlicenca || aud
        }

        return next();

    }catch{
        throw unauthorized();
    };

};
