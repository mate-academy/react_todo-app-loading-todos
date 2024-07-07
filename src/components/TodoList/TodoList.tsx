/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todoshka } from '../Todoshka/Todoshka';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => (
        <Todoshka todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
