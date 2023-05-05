import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../../types/Filter';

type Props = {
  filterOption: FilterType,
  onChangeFilterOption: (option: FilterType) => void
};

export const Footer: React.FC<Props> = ({
  filterOption,
  onChangeFilterOption,
}) => {
  return (
    <>
      <footer className="todoapp__footer">
        <span className="todo-count">
          3 items left
        </span>

        <nav className="filter">
          <a
            href="#/"
            className={
              classNames(
                'filter__link',
                { selected: filterOption === 'all' ? 'selected' : '' },
              )
            }
            onClick={() => onChangeFilterOption(FilterType.ALL)}
          >
            All
          </a>

          <a
            href="#/active"
            className={
              classNames(
                'filter__link',
                { selected: filterOption === 'active' ? 'selected' : '' },
              )
            }
            onClick={() => onChangeFilterOption(FilterType.ACTIVE)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={
              classNames(
                'filter__link',
                { selected: filterOption === 'completed' ? 'selected' : '' },
              )
            }
            onClick={() => onChangeFilterOption(FilterType.COMPLETED)}
          >
            Completed
          </a>
        </nav>

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>
    </>
  );
};
