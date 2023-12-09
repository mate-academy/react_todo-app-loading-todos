import { Todo } from './Todo';
import { Filter } from './Filter';

export type Action = { type: 'setTodos', payload: Todo[] }
| { type: 'addTodo', payload: Todo }
| { type: 'editTodo', payload: Todo }
| { type: 'deleteTodo', payload: Todo }
| { type: 'clearCompleted' }
| { type: 'toggleCompletion', payload: Todo }
| { type: 'toggleAllCompletions' }
| { type: 'setFilter', payload: Filter };
