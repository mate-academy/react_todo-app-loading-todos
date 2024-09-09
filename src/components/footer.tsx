import { Dispatch, FC, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface Props {
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  todos: Todo[];
  onDelete: (userId: number) => void;
}

export const Footer: FC<Props> = ({ setFilter, filter, todos, onDelete }) => {
  const handleActiveTodos = todos.reduce((acc, val) => {
    if (!val.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        onDelete(todo.id);
      }
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {handleActiveTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: 'all' === filter,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: 'active' === filter,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: 'completed' === filter,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
