/* eslint-disable */

import { TodoItem } from '../TodoItem'
import type { Todo } from '../../types/Todo';

type Props = {
  todos : (Todo[]);
}

export const TodoList: React.FC<Props> = ({todos}) => (
  <>
    {todos.map(todo=> <TodoItem key={todo.id} todo={todo}/>)}
  </>
);
