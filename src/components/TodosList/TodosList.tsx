import React from 'react';
import { TodoElement } from '../TodoElement';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
}

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos?.map(todo => (
        <TodoElement todo={todo} key={todo.id} />
      ))}
    </>
  );
};
