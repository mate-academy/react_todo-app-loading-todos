import React from 'react';
import { Options } from '../../types/Options';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodo: Todo[];
  selected: Options;
  setSelected: (selected: Options) => void;
};

export const Footer: React.FC<Props> = ({
  filteredTodo,
  selected,
  setSelected,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {filteredTodo.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selected === Options.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelected(Options.All)}
        >
          {Options.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selected === Options.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelected(Options.Active)}
        >
          {Options.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selected === Options.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelected(Options.Completed)}
        >
          {Options.Completed}
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={Options.Completed.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
