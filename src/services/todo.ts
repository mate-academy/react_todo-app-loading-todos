import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export function getTodos() {
  return client.get<Todo[]>('/todos')
    .then(todos => todos.slice(0, 11712));
}
