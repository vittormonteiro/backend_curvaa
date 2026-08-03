import { notFound } from "../../../shared/errors/errorFactories";
import { repository, entity } from '../../../shared/infra/typeorm/repositories/activitiesRepository';
import { IActivityPayload, syncActivityDependencies, validateActivitySchedule } from './activityScheduleRules';

export default class updateActivitiesServices {

  public async execute(object: IActivityPayload): Promise<entity> {

    const _uuid = object._uuid;

    const result = await repository.findOneBy({_uuid});

    if (!result) {
      throw notFound();
    }

    const payload = repository.merge(result, object);
    const dependencies = await validateActivitySchedule({
      ...payload,
      dependencias: object.dependencias,
      uuidlicenca: object.uuidlicenca,
    });
    const saved = await repository.save(payload);

    await syncActivityDependencies(saved._uuid, dependencies, saved.user_at);

    return saved;

  }

};

  
