import { repository, entity } from '../../../shared/infra/typeorm/repositories/activitiesRepository';
import { IActivityPayload, syncActivityDependencies, validateActivitySchedule } from './activityScheduleRules';

export default class createActivitiesServicess {

  public async execute(object: IActivityPayload): Promise<entity> {

    const result = repository.create(object);
    const dependencies = await validateActivitySchedule({
      ...result,
      dependencias: object.dependencias,
      uuidlicenca: object.uuidlicenca,
    });
   
    const saved = await repository.save(result);

    await syncActivityDependencies(saved._uuid, dependencies, saved.user_at);

    return saved;

  };

};
