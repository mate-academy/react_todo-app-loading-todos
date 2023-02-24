import { Error } from '../enum/Errors';

export const Errors = {
  [Error.RESET]: '',
  [Error.ADD]: 'Unable to add a todo',
  [Error.REMOVE]: 'Unable to delete a todo',
  [Error.UPDATE]: 'Unable to delete a todo',
  [Error.TITLE]: 'Title can\'t be empty',
  [Error.DATA]: 'Data error',
  [Error.USER]: 'Check your USER_ID',
  [Error.UPLOAD]: 'Unable to upload a todos',
};
