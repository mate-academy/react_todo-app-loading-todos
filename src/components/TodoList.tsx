import React from 'react';
import { TodoListProps } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  loading,
  isActive,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          loading={loading}
          isActive={isActive}
        />
      ))}
    </section>
  );
};
