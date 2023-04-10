import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo/TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </section>
);
