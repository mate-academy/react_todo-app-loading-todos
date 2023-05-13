import { FC } from 'react';
import classNames from 'classnames';
import { Status } from '../../enum/Status';

interface FooterProps {
  onStatusSelect: (status: string) => void;
  todoStatus: string;
}

export const Footer: FC<FooterProps> = ({ onStatusSelect, todoStatus }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    onStatusSelect(event.currentTarget.text.toLowerCase());
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: todoStatus === Status.All },
          )}
          onClick={handleClick}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: todoStatus === Status.Active },
          )}
          onClick={handleClick}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: todoStatus === Status.Completed },
          )}
          onClick={handleClick}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
