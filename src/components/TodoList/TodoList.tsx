import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../Todo/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => (
  <section className="todoapp__main">
    {todos.map((todo) => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
));
