import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  tempTodo: Todo | null;
  loadingIds: number[];
  onDelete: (todoId: number) => Promise<void>;
  onToggle: (todoId: number, completed: boolean) => Promise<void>;
  onRename: (todoId: number, title: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  tempTodo,
  loadingIds,
  onDelete,
  onToggle,
  onRename,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isLoading={loadingIds.includes(todo.id)}
        onDelete={onDelete}
        onToggle={onToggle}
        onRename={onRename}
      />
    ))}

    {tempTodo && (
      <TodoItem
        key={tempTodo.id}
        todo={tempTodo}
        isLoading
        onDelete={onDelete}
        onToggle={onToggle}
        onRename={onRename}
      />
    )}
  </section>
);
