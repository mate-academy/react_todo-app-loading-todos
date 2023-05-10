import classNames from 'classnames';
import { FC } from 'react';
import { Category } from '../../types/Category';

/* Hide the footer if there are no todos */

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
}

export const FooterTodoApp: FC<Props> = ({ category, setCategory }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: category === 'all',
          })}
          onClick={() => setCategory('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: category === 'active',
          })}
          onClick={() => setCategory('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: category === 'completed',
          })}
          onClick={() => setCategory('completed')}
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
