import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <li>
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        </li>
      ))}
    </ul>
  );
};
