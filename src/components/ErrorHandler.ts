import { type Error } from '../types/Error';

export const ErrorHandler = (errors: Error[], errorType: Error['type']) => {
  return errors.map(error =>
    error.type === errorType ? { ...error, value: true } : error,
  );
};
