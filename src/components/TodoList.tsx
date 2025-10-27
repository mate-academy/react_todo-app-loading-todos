import React from 'react';
import { Todo } from '../types/Todo';
import { TodoComp } from './TodoComp';

type Props = {
  todos: Todo[];
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => {
      return <TodoComp key={todo.id} todo={todo} isLoading={isLoading} />;
    })}
  </section>
);
