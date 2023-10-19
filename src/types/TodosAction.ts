import { Todo } from './Todo';

export type TodosAction = { type: 'initialize', payload: Todo[] }
| { type: 'create', payload: Todo };
