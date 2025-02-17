import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  handleToggleTodo: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, handleToggleTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
