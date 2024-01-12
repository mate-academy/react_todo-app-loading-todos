import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem:React.FC<Props> = () => {
  return (
    <h1>Todo Item</h1>
  );
};
