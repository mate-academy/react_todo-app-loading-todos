import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  visibleTodos: Todo[];
  loadingTodoIds: number[];
}

export const TodoList: React.FC<Props> = ({ visibleTodos, loadingTodoIds }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isLoading={loadingTodoIds.includes(todo.id)}
        />
      ))}
    </section>
  );
};
