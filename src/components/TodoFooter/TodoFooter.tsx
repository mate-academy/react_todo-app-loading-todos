import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  select: string,
  setSelect:(value: string) => void;
  todos: Todo [];
  lengTodos: number
};

export const TodoFooter: React.FC<Props> = (
  {
    setSelect,
    lengTodos,
    select,
  },
) => {
  return (

    <footer className="todoapp__footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count">
        {lengTodos}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: select === 'all' },
          )}
          onClick={() => setSelect('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: select === 'active' },
          )}
          onClick={() => setSelect('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: select === 'completed' },
          )}
          onClick={() => setSelect('completed')}
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
