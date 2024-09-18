import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  sortedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ sortedTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {sortedTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
