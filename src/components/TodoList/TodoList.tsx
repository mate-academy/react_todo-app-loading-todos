import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC<{
  filteredTodos: Todo[]
}> = ({ filteredTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {filteredTodos && filteredTodos.map(
      (todo: Todo) => <TodoItem key={todo.id} todo={todo} />,
    )}
  </section>
);
