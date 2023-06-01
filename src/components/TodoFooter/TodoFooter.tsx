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
      <span className="todo-count">
        {lengTodos}
        {' '}
        {lengTodos === 1 ? 'item left' : 'items left' }
      </span>
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
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
