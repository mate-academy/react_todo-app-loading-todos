import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItems';

type TodoListProps = {
  filteredTodos: Todo[];
  loading: boolean;
  onDelete: (id: Todo['id']) => void;
  onToggle: (id: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  loading,
  onDelete,
  onToggle,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {loading ? (
      <p>Loading todos...</p>
    ) : (
      filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))
    )}
  </section>
);
