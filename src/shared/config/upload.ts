import path from 'path';
import crypto from 'crypto';
import multer, {StorageEngine} from 'multer';

const uploadsFolder = path.resolve(__dirname,'..','..','..','uploads');

interface IUploadConfig {
  driver: 'disk';
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  }
}

export default {

    driver: 'disk',
    uploadsFolder: uploadsFolder,
    multer: {
      storage: multer.diskStorage({
        destination: uploadsFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const format = file.originalname.substring(file.originalname.lastIndexOf('.')+1);
            const fileName = `${fileHash}.${format}`;
            return callback(null,fileName);
        },
      }),
    }

} as IUploadConfig;
