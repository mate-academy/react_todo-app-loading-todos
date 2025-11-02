import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  filteredTodos: Todo[];
  isAdding: boolean;
  isLoading: boolean;
  lastSavingTodo: Todo;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  isAdding,
  isLoading,
  lastSavingTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} isLoading={isLoading} />
      ))}

      {/* This todo is in loadind state */}
      {isAdding && (
        <TodoItem
          key={lastSavingTodo.id}
          todo={lastSavingTodo}
          isLoading={isAdding}
        />
      )}
    </section>
  );
};
