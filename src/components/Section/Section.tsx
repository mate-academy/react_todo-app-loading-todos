/* eslint-disable no-console */
import React from 'react';
import { TodoType } from '../../types/TodoType';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoType[];
};

export const Section: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
