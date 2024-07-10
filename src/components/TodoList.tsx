import React from 'react';
import { Todo as TodoType } from '../types/Todo';
import { Todo } from './Todo';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

type Props = {
  todos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo todo={todo} key={uuidv4()} />
      ))}
    </section>
  );
};
