import { Todo } from '../types/Todo';
import React from 'react';
import { Todofile } from '../Todofile/Todofile';

interface Props {
  todos: Todo[];
  onselect: (todo: number) => void;
  Updated: (todo: Todo) => void;
}

export const Todolist: React.FC<Props> = ({
  todos = [],
  onselect,
/* eslint-disable */
  Updated,
}) => {
  return (
    <>
      {todos.map(todo => {
        return (
          <Todofile
            key={todo.id}
            todo={todo}
            onSelect={onselect}
            updated={Updated}
          />
        );
      })}
    </>
  );
};
