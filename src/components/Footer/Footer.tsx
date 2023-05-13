import { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Status } from '../../enum/Status';
import { Todo } from '../../types/Todo';

interface FooterProps {
  todos: Todo[],
  onStatusSelect: (status: string) => void;
  todoStatus: string;
}

export const Footer: FC<FooterProps> = ({
  todos,
  onStatusSelect,
  todoStatus,
}) => {
  const handleClick = useCallback((
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    onStatusSelect(event.currentTarget.text.toLowerCase());
  }, []);

  const calcNotCompletedTodosLength = useCallback(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  const notCompletedTodosLength = useMemo(calcNotCompletedTodosLength, [todos]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${notCompletedTodosLength} items left`}
      </span>

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
