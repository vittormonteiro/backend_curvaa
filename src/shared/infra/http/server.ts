import express, {Request, Response, NextFunction}  from 'express';
import 'reflect-metadata';
import cors from 'cors';
import {errors} from 'celebrate';
import path from 'path';
import { EntityNotFoundError } from 'typeorm';
import { AppDataSource } from '../../../shared/infra/typeorm/data-source';
import uploadConfig from '../../config/upload';
import routes from '../../../modules/routes';
import AppError from '../../errors/appError';
import '../../../jobs/sendNotification';
import StorageProvider from '../../../shared/providers/diskStorageProvider';

import {env} from '../../config/env';

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../../../docs/v1/swagger.json";


const app = express();

app.use(cors());
app.use(express.json({limit: '300mb'}));
app.use(express.urlencoded({ limit: '300mb', extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(routes);
app.use(errors());


app.use('/files/colaboradores', express.static(path.resolve(uploadConfig.uploadsFolder,'colaboradores')));
app.use('/files/comunicados', express.static(path.resolve(uploadConfig.uploadsFolder,'comunicados')));
app.use('/files/tutorial', express.static(path.resolve(uploadConfig.uploadsFolder,'tutoriais')));
app.use('/files/obras', express.static(path.resolve(uploadConfig.uploadsFolder,'obras')));

app.use((error:Error, request:Request, response:Response, next:NextFunction) =>{

  if(request.method === 'PATCH'){

    const file_name = request.file?.filename;

    if(file_name){
      const storageProvider = new StorageProvider();
      storageProvider.deleteFile('', file_name, '');
    }

  }

  if (error instanceof AppError){
    return response.status(error.status).json({
      status:  error.status,
      message: error.message
    });
  };

  if (error instanceof EntityNotFoundError) {
    return response.status(404).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    status:  500,
    message: error.message
  });

});

const HOSTNAME = env.HOST || 'localhost';
const PORT = Number(env.PORT) || 3333;

AppDataSource.initialize().then(() => {
  
  console.log("📦 Connected to database");

  app.listen(PORT, HOSTNAME, () => {
    console.log(`🚀 Server running at http://${HOSTNAME}:${PORT}/`);
  });

}).catch(err => {
  console.error("❌ Error during Data Source initialization:", err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
