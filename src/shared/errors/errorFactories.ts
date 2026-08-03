import AppError from './appError';

export const notFound = (message = 'Recurso não encontrado') => {
  //console.log(message);
  throw new AppError(message, 404);
};

export const badRequest = (message = 'Requisição inválida') => {
  //console.log(message);
  throw new AppError(message, 400);
};

export const unauthorized = (message = 'Não autorizado') => {
  //console.log(message);
  throw new AppError(message, 401);
};

export const forbidden = (message = 'Acesso negado') => {
  //console.log(message);
  throw new AppError(message, 403);
};

export const conflict = (message = 'Conflito de dados') => {
  //console.log(message);
  throw new AppError(message, 409);
};
