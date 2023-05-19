import React from 'react';
import uuid from 'react-uuid';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (

    <section className="todoapp__main">
      {todos.map(({ title }) => (
        <TodoItem title={title} key={uuid()} />
      ))}
    </section>
  );
};
