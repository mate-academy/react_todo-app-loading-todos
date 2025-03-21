type Message = '' | 'load' | 'emptyTitle' | 'add' | 'delete' | 'update';

export type ErrorType = {
  isVisible: boolean;
  type: Message;
};
