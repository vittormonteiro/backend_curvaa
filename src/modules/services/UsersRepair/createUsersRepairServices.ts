import {badRequest, forbidden} from "../../../shared/errors/errorFactories";
import {repository as accessRepository} from "../../../shared/infra/typeorm/repositories/accessRepository";
import {repository as usersRepairRepository} from "../../../shared/infra/typeorm/repositories/usersRepairRepository";
import sendEmailRepairUserServices from "../UsersRepair/sendUserRepairServices";

export default class createUsersRepairServices {

  public async execute(email: string): Promise<String>  {

    const sendEmail = new sendEmailRepairUserServices();
    const user = await accessRepository.findByEmail(email);

    if (!user) {
      throw forbidden('Email não cadastrado.');
    }

    try {

      await usersRepairRepository.delete({email: user.email});
      
      const userRepair = usersRepairRepository.create({
        email: user.email,
        uuidusuario: user.uuidusuario
      });

      const result = await usersRepairRepository.save(userRepair);
      
      await sendEmail.execute({
        to: [user.email],
        subject: 'Recuperação de senha - Login:' + user.login,
        message: `${process.env.DNS}/pages/repair?token=${result._uuid}`
      });
  
      return "Verifique seu email para acessar o link de redefinição de senha.";

    } catch (error) {

      const message = error instanceof Error ? error.message : String(error);
      throw badRequest(message);
    
    };
    
  };

};


