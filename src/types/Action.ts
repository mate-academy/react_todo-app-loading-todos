import { Todo } from './Todo';
import { Filter } from './Filter';
import { Error } from './Error';

export type Action = { type: 'setTodos', payload: Todo[] }
| { type: 'setFilteredTodos', payload: Todo[] }
| { type: 'addTodo', payload: Todo }
| { type: 'editTodo', payload: Todo }
| { type: 'deleteTodo', payload: Todo }
| { type: 'clearCompleted' }
| { type: 'toggleCompletion', payload: Todo }
| { type: 'toggleAllCompletions' }
| { type: 'setFilter', payload: Filter }
| { type: 'setError', payload: Error | '' };
