/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
