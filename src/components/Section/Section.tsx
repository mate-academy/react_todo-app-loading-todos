import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  isLoading: boolean;
  filter: 'all' | 'active' | 'completed';
}

export const Section: React.FC<Props> = ({ todos, isLoading, filter }) => {
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      )}
    </section>
  );
};
