import { repositoryView, view } from '../../../shared/infra/typeorm/repositories/worksRepository';

type StatusKey = 'ATIVO' | 'SUSPENSO' | 'FINALIZADO';

interface IProgress {
  percent: number;
  elapsedDays: number;
  remainingDays: number;
}

export interface IDashboardWork {
  _uuid: string;
  status: string;
  status_label: string;
  obra: string;
  responsavel: string;
  orcado: number;
  orcado_str: string;
  realizado: number;
  realizado_str: string;
  realizado_percent: number;
  evolucao_percent: number;
  mao_obra_percent: number;
  material_percent: number;
  equipamento_percent: number;
  outros_percent: number;
  data: string;
  previsao: string;
  dt_fim: string;
  dias_decorridos: number;
  dias_restantes: number;
}

interface IDashboardWorksResponse {
  works: Array<{
    _uuid: string;
    obra: string;
  }>;
  rows: IDashboardWork[];
}

const statusLabels: Record<StatusKey, string> = {
  ATIVO: 'Em andamento',
  SUSPENSO: 'Paralisada',
  FINALIZADO: 'Finalizada',
};

const toNumber = (value: unknown): number => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
};

const startOfDay = (value?: string): Date | null => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  date.setHours(0, 0, 0, 0);
  return date;
};

const diffInDays = (start: Date, end: Date): number => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / oneDay);
};

const clampPercent = (value: number): number => {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
};

const getScheduleProgress = (work: view): IProgress => {
  const startDate = startOfDay(work.data);
  const endDate = startOfDay(work.dt_fim || work.previsao);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!startDate || !endDate) {
    return {
      percent: 0,
      elapsedDays: 0,
      remainingDays: 0,
    };
  }

  const totalDays = Math.max(diffInDays(startDate, endDate), 0);
  const elapsedDays = Math.max(diffInDays(startDate, today), 0);
  const remainingDays = Math.max(diffInDays(today, endDate), 0);

  if (work.status === 'FINALIZADO') {
    return {
      percent: 100,
      elapsedDays: totalDays,
      remainingDays: 0,
    };
  }

  return {
    percent: totalDays === 0 ? 100 : clampPercent((elapsedDays / totalDays) * 100),
    elapsedDays,
    remainingDays,
  };
};

export default class DashboardWorksServices {
  public async execute(uuidlicenca: string): Promise<IDashboardWorksResponse> {
    const works = await repositoryView.findByLicense(uuidlicenca);

    const rows = works.map((work) => {
      const scheduleProgress = getScheduleProgress(work);
      const budget = toNumber(work.valor);
      const status = work.status as StatusKey;

      return {
        _uuid: work._uuid,
        status: work.status,
        status_label: statusLabels[status] || work.status,
        obra: `${work.codigo} - ${work.titulo}`,
        responsavel: work.cliente,
        orcado: budget,
        orcado_str: work.valor_str,
        realizado: 0,
        realizado_str: 'R$ 0,00',
        realizado_percent: 0,
        evolucao_percent: scheduleProgress.percent,
        mao_obra_percent: 0,
        material_percent: 0,
        equipamento_percent: 0,
        outros_percent: 0,
        data: work.data,
        previsao: work.previsao,
        dt_fim: work.dt_fim,
        dias_decorridos: scheduleProgress.elapsedDays,
        dias_restantes: scheduleProgress.remainingDays,
      };
    });

    const workOptions = rows
      .map((row) => ({
        _uuid: row._uuid,
        obra: row.obra,
      }))
      .sort((a, b) => a.obra.localeCompare(b.obra));

    return {
      works: workOptions,
      rows,
    };
  }
}
