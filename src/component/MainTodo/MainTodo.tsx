import React from 'react';
import { Todo } from '../../types/Todo';
import { MainList } from './MainList';

interface Props {
  todos: Todo[];
}

export const MainTodo: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <MainList
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
