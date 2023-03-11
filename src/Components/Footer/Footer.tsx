import React from 'react';
import { Filters } from '../../types/Filters';
import Filter from '../Filter/Filter';

type Props = {
  filter: Filters;
  changeFilter: (value: Filters) => void;
  completedTodosLength: number;
  activeTodosLength: number;
};

const Footer: React.FC<Props> = ({
  filter,
  changeFilter,
  completedTodosLength,
  activeTodosLength,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${activeTodosLength} items left`}
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
          visibility: !completedTodosLength
            ? 'hidden'
            : 'visible',
        }
      }
    >
      Clear completed
    </button>
  </footer>
);

export default Footer;
