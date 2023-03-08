import React from 'react';
import { Filters } from '../../types/Filters';
import Filter from '../Filter/Filter';

type Props = {
  filter: Filters;
  changeFilter: (value: Filters) => void;
  completedTodosLength: number;
};

const Footer: React.FC<Props> = ({
  filter,
  changeFilter,
  completedTodosLength,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      3 items left
    </span>

    <Filter
      filter={filter}
      changeFilter={changeFilter}
    />

    <button
      type="button"
      className="todoapp__clear-completed"
      style={
        {
          visibility: `${completedTodosLength === 0
            ? 'hidden'
            : 'visible'}`,
        }
      }
    >
      Clear completed
    </button>
  </footer>
);

export default Footer;
