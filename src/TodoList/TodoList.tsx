// components/TodoList.tsx
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  loadingTodoId: number | null;
  handleToggle: (todo: Todo) => void;
  handleDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  loadingTodoId,
  handleToggle,
  handleDelete,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        loadingTodoId={loadingTodoId}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    ))}
  </section>
);
