import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[],
  setFilter: React.Dispatch<React.SetStateAction<Filter>>,
};

export const Footer: React.FC<Props> = ({ todos, setFilter }) => {
  const [selectedLink, setSelectedLink] = useState<string | null>('All');

  const handleAllChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const selectedLinkText = event.currentTarget.textContent;

    setSelectedLink(selectedLinkText);
    setFilter(Filter.All);
  };

  const countItemsLeft = useMemo(() => {
    const count = [...todos]
      .filter(todo => !todo.completed).length;

    return count;
  }, [todos]);

  const completedItems = todos.some(todo => todo.completed);

  // eslint-disable-next-line
  const handleActiveChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const selectedLinkText = event.currentTarget.textContent;

    setSelectedLink(selectedLinkText);
    setFilter(Filter.Active);
  };

  // eslint-disable-next-line
  const handleCompletedChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const selectedLinkText = event.currentTarget.textContent;

    setSelectedLink(selectedLinkText);
    setFilter(Filter.Completed);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countItemsLeft} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedLink === 'All',
          })}
          onClick={handleAllChange}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedLink === 'Active',
          })}
          onClick={handleActiveChange}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedLink === 'Completed',
          })}
          onClick={handleCompletedChange}
        >
          Completed
        </a>
      </nav>

      {completedItems && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
