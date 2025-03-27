import { FC, useCallback } from 'react';
import { TodoType } from '../types/Todo';
import { footerLinks } from '../utils/footer';
import classNames from 'classnames';

type Props = {
  selectedType: TodoType;
  handleSelectType: (data: TodoType) => void;
  hasCompleted: boolean;
};

export const Footer: FC<Props> = ({
  selectedType,
  handleSelectType,
  hasCompleted,
}) => {
  const selectType = useCallback(
    (data: TodoType) => {
      return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        handleSelectType(data);
      };
    },
    [handleSelectType],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {footerLinks?.map(link => (
          <a
            key={link.key}
            href={link.href}
            data-cy={link.dataCy}
            className={classNames('filter__link', {
              selected: selectedType === link.key,
            })}
            onClick={selectType(link.key)}
          >
            {link.label}
          </a>
        ))}
        {/* <a href="#/" className="filter__link selected" data-cy="FilterLinkAll">
          All
        </a>

        <a href="#/active" className="filter__link" data-cy="FilterLinkActive">
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a> */}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
