import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section>
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);
