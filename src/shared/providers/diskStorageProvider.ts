import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';
import { exec } from "child_process";


interface IStorageProvider {
  createRemoteFolder(host: string, _path:string, _folder:string) : Promise<string>;
  saveFile(folder: string, file:string, key: string) : Promise<string>;
  deleteFile(folder: string, file:string, key: string) : Promise<void>;
};

export default class diskStorageProvider implements IStorageProvider{

    public async createRemoteFolder( command:string): Promise<string>{

      exec(command, (error, stdout, stderr) => {

          if (error) {
              console.log(`Erro ao criar pasta: ${error.message}`)
              return `Erro ao criar pasta: ${error.message}`;
          }

          if (stderr) {
            console.log(`Erro: ${stderr}`)
            return `Erro: ${stderr}`;
          }

      });

      return "Pasta criada com sucesso no servidor remoto!";

    };

    public async createLS(command:string): Promise<string>{

      exec(command, (error, stdout, stderr) => {

          if (error) {
              console.log(`Erro ao criar o link simbólico: ${error.message}`)
              return `Erro ao criar o link simbólico: ${error.message}`;
          }

          if (stderr) {
            console.log(`Erro: ${stderr}`)
            return `Erro: ${stderr}`;
          }

      });

      return "Pasta criada com sucesso no servidor remoto!";

    };
    
    public async saveFile(folder: string, file:string, key: string): Promise<string>{

      const from = path.resolve(uploadConfig.uploadsFolder, file);

      const folderPath = key != undefined ? path.resolve(uploadConfig.uploadsFolder, folder, key) : 
      path.resolve(uploadConfig.uploadsFolder, folder);
     
      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, {recursive: true});
      }
 
      const to = path.resolve(folderPath, file);
      
      await fs.promises.rename(from, to);

      const filePath = key != undefined ?  path.join(folder, key, file) : path.join(folder, file);

      return String(path.join('files', filePath)).replace(/\\/gi,"/");
      
    };

    public async deleteFile(folder: string, file:string, key: string): Promise<void>{

      file = file.replace(/\//gi,"\\");
      
      file  = file.substring(file.lastIndexOf('\\')+1);

      const filePath = key != undefined ? path.resolve(uploadConfig.uploadsFolder, folder, key, file) : path.resolve(uploadConfig.uploadsFolder, folder, file) ;
      //verificando se o arquivo existe -> fs.promises.stat(filePath);
      
      //console.log(filePath)
      
      try{
        await fs.promises.stat(filePath);
      }
      catch (e) {
        //se não encontrou um arquivo, retorna um erro
        return;
      }
      //se encontrou o arquivo, vem direto pra cá!
      await fs.promises.unlink(filePath);
    };

};
