import React from 'react';
import { TodoItem } from '../Todo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
});
