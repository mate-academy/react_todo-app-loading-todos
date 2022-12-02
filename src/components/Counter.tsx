import React, { useContext } from 'react';
import { AppContext } from './AppContext';

export const Counter: React.FC = () => {
  const itemsLeft = useContext(AppContext).todosFromServer.length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${itemsLeft} items left`}
    </span>
  );
};
