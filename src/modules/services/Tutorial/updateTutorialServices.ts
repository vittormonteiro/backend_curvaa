import {repositoryView, repository, entity} from "../../../shared/infra/typeorm/repositories/tutorialRepository";

export default class updateTutorialServices {

  public async execute(object:entity): Promise<entity> {

    const result = await repositoryView.findByModuleAndUser(object.uuidmodulo, object.uuidusuario);

    if(result){
      result.skipped = true;
      return await repository.save(result);
    }else{
      const content = repository.create(object);
      return await repository.save(content);
    }

  };

};

