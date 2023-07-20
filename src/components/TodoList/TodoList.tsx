import React from 'react';
import { Error, Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setHasError: (value: Error) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setHasError,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoCard
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          key={todo.id}
          setHasError={setHasError}
        />
      ))}
    </section>
  );
};
