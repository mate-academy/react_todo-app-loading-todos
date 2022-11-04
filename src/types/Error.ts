export type Error = 'addTodoError' | 'deleteTodoError' | 'updateTodoError';
export type ErrorTimeout = (arg: boolean) => void;
export type ErrorButtonHandler = (arg: boolean) => void;
export type ErrorCloser = 'addtodo' | 'deletetodo' | 'updatetodo';
