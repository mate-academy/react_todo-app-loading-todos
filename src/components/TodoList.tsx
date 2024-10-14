import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  preparedTodos: Todo[];
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ preparedTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedTodos.map(todo => (
        <TodoItem preparedTodos={todo} key={todo.id} />
      ))}
    </section>
  );
};
