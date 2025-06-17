import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  loadingTodos: number[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  loadingTodos,
  onDelete,
  onToggle,
  onUpdate,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={onDelete}
        onToggle={onToggle}
        onUpdate={onUpdate}
        isLoading={loadingTodos.includes(todo.id)}
      />
    ))}

    {tempTodo && (
      <TodoItem
        todo={tempTodo}
        onDelete={onDelete}
        onToggle={onToggle}
        onUpdate={onUpdate}
        isLoading
      />
    )}
  </section>
);
