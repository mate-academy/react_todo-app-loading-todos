import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  count: number,
  setFilter: (option: string) => void;
  clearCompleted: () => void;
  isCompleted: boolean,
};

export const Footer: React.FC<Props> = (
  {
    count,
    setFilter,
    clearCompleted,
    isCompleted,
  },
) => {
  const [isSelectedAll, setSelected] = useState(false);
  const [isSelectedActive, setSelectedActive] = useState(false);
  const [isSelectedCompleted, setSelectedCompleted] = useState(false);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: isSelectedAll })}
          onClick={() => {
            setFilter('all');
            setSelected(!isSelectedAll);
            setSelectedActive(false);
            setSelectedCompleted(false);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', { selected: isSelectedActive })}
          onClick={() => {
            setFilter('active');
            setSelectedActive(!isSelectedActive);
            setSelected(false);
            setSelectedCompleted(false);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: isSelectedCompleted,
          })}
          onClick={() => {
            setFilter('completed');
            setSelectedCompleted(!isCompleted);
            setSelected(false);
            setSelectedActive(false);
          }}
        >
          Completed
        </a>
      </nav>

      {
        isCompleted && (
          <button
            type="button"
            className="todoapp__clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
