import {repositoryView, view} from "../../../shared/infra/typeorm/repositories/tutorialRepository";

interface IResquestDTO {
  uuidmodulo: string;
  uuidusuario: string;
}

export default  class readTutorialServices {

  public async execute({uuidmodulo, uuidusuario}: IResquestDTO): Promise<view | null> {

    return await repositoryView.findByModuleAndUser(uuidmodulo, uuidusuario);

  };

};


