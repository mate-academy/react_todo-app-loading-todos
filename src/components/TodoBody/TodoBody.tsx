import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoBody: React.FC<Props> = React.memo(({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">

    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}

  </section>
));
