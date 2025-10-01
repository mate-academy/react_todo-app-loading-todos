import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loadingTodos: Record<string | number, boolean>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  loadingTodos,
  toggleTodo,
  deleteTodo,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isLoading={loadingTodos[todo.id]}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ))}
  </section>
);
