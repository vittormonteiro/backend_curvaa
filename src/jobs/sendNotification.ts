import cron from 'node-cron';
import CreateNotificationServices from '../modules/services/Notification/createNotificationServices';
import DispatcherNotificationEmailsServices from '../modules/services/Notification/dispatcherNotificationEmailsServices';
import DispatcherProspectMailerServices from '../modules/services/ProspectMailer/dispatcherProspectMailerServices';
import ShowNotificationEmailsServices from '../modules/services/Notification/showNotificationEmailsServices';
import AppError from '../shared/errors/appError';

export default class sendNotification {

  public async exec() {

    const services = new ShowNotificationEmailsServices();
    const services2 = new CreateNotificationServices();

    // Schedule the job to run every day at midnight '0 0 * * *'
    cron.schedule('*/5 * * * *', async () => {  
      
      try {

        const rows = <any> [];

        const result = await services.execute();

        if (result instanceof AppError) {
          console.error('Error fetching notifications:', result.message);
          return;
        }

        result.forEach(async (item:any) => {
          rows.push({
            uuidusuario: item.uuidusuario,
            titulo: item.titulo,  
            descricao: item.descricao
          });
        });

        await services2.execute(rows);

      } catch (error) {
        console.error('Error fetching data:', error);
      }  

    });  

  };

  public async exec2() {

    const services3 = new DispatcherNotificationEmailsServices();

    cron.schedule('*/10 * * * *', async () => {  
      
      try {

        await services3.execute();

      } catch (error) {
        console.error('Error fetching data:', error);
      }  

    });  

  };

  public async exec3() {

    const services3 = new DispatcherProspectMailerServices();

    //30s
    cron.schedule('*/30 * * * * *', async () => {  
      
      try {

        await services3.execute();

        console.log('Cron job executed successfully!');

      } catch (error) {

        if (error instanceof AppError) {
          console.error('Cron Error:',  error.message || String(error));;
        }

      }  

    });  

  };

};

//new sendNotification().exec();
//new sendNotification().exec2();
//new sendNotification().exec3();