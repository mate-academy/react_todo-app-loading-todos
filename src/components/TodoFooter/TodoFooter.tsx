import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoFilter } from '../TodoFilter';
import { TodoClearButton } from '../TodoClearButton';

type Props = {
  changeQuery: (query: string) => void,
  active: number,
  completed: boolean,
};

export const TodoFooter: React.FC<Props> = ({
  changeQuery, active, completed,
}) => {
  return (
    <footer className="todoapp__footer">
      <TodoCounter active={active} />
      <TodoFilter changeQuery={changeQuery} />
      <TodoClearButton completed={completed} />
    </footer>
  );
};
