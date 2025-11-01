import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
        onToggle={() => onToggle(todo.id)}
        onDelete={() => onDelete(todo.id)}
      />
    ))}
  </section>
);
