/* eslint-disable no-console */
import classNames from 'classnames';
import React from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  onSetFilterGlobal: React.Dispatch<React.SetStateAction<string>>
  selectedFilter: string
};

export const Footer: React.FC<Props> = ({
  todos,
  onSetFilterGlobal,
  selectedFilter,
}) => {
  console.log('Filetr LINK', selectedFilter);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    title: string,
  ) => {
    e.preventDefault();
    onSetFilterGlobal(title);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          title={Filter.ALL}
          className={classNames(
            'filter__link',
            { selected: selectedFilter === Filter.ALL },
          )}
          onClick={event => handleAnchorClick(event, event.currentTarget.title)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          title={Filter.ACTIVE}
          className={classNames(
            'filter__link',
            { selected: selectedFilter === Filter.ACTIVE },
          )}
          onClick={event => handleAnchorClick(event, event.currentTarget.title)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          title={Filter.COMPLETED}
          className={classNames(
            'filter__link',
            { selected: selectedFilter === Filter.COMPLETED },
          )}
          onClick={event => handleAnchorClick(event, event.currentTarget.title)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
