import React from 'react';
import { TodoFilter } from './TodoFilter/TodoFilter';
import { TodoCounter } from './TodoCounter';
import { TodoClearButton } from './TodoClearButton';

type Props = {
  changeQuery: (query: string) => void,
  active: number,
  completed: boolean,
};

export const TodoFooter: React.FC<Props> = ({
  changeQuery,
  completed,
  active,
}) => {
  return (
    <footer className="todoapp__footer">
      <TodoCounter active={active} />
      <TodoFilter
        changeQuery={changeQuery}
      />
      <TodoClearButton completed={completed} />
    </footer>
  );
};
