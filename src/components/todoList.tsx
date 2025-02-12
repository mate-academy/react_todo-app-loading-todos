import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './todo';

interface TodoListProps {
  filteredTodos: Todo[];
  isActive: number | undefined;
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  isActive,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isActive={isActive}
          isLoading={false} //убрати
        />
      ))}
    </section>
  );
};
