import React from 'react';
import { Options } from '../../types/Options';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter/Filter';

type Props = {
  onFilterChange: (value: Options) => void;
  option: Options;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  option,
  onFilterChange,
  todos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todos.length} items left`}
      </span>

      <Filter option={option} onFilterChange={onFilterChange} />

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
