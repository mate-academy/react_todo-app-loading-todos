import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  filteredTodos: Todo[],
}

export const TodoList: React.FC<Props> = ({ filteredTodos }) => (
  <ul className="todoapp__main" data-cy="TodoList">
    {filteredTodos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </ul>
);
