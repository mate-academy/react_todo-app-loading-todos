import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  setAvtiveTab: (value: string) => void;
  avtiveTab: string,
};

export const Footer: React.FC<Props> = ({ todos, setAvtiveTab, avtiveTab }) => {
  const tubs: string[] = ['All', 'Active', 'Completed'];
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setAvtiveTab(e.currentTarget.textContent || 'All');
  };

  return (
    <>
      {Boolean(todos.length) && (
        <footer className="todoapp__footer">
          <span className="todo-count">3 items left</span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            {tubs.map((tub) => (
              <a
                href={`#/${tub !== 'All' ? tub.toLocaleLowerCase() : ''}`}
                className={classNames('filter__link',
                  { selected: avtiveTab === tub })}
                onClick={handleClick}
              >
                {tub}
              </a>
            ))}
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
