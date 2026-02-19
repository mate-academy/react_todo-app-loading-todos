import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loadingIds?: number[]; // lista todos w stanie loading
  editingId?: number; // id todo w edycji
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loadingIds = [],
  editingId,
}) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          isLoading={loadingIds.includes(todo.id)}
        />
      ))}
    </section>
  );
};
