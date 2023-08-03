import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="movies">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ))}
  </div>
);
