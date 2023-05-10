import classNames from 'classnames';
import { FC } from 'react';
import { Status } from '../types/StatusEnum';

interface BottomPanelProps {
  countOfItems: number;
  selectedStatus: string;
  changeStatusOfTodo: (status: string) => void;
}

export const BottomPanel: FC<BottomPanelProps> = (
  { countOfItems, changeStatusOfTodo, selectedStatus },
) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const text = (event.target as HTMLInputElement).value;// text

    changeStatusOfTodo(text);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countOfItems} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedStatus === Status.ALL,
          })}
          onClick={handleClick}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedStatus === Status.ACTIVE,
          })}
          onClick={handleClick}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedStatus === Status.COMPLETED,
          })}
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
