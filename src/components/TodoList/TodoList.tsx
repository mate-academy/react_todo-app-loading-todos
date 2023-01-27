import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </section>
    );
  },
);
