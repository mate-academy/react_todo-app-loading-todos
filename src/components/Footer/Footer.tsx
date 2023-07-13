import classNames from 'classnames';
import { Etodos } from '../../types/enum';
import { Todo } from '../../types/Todo';

type Props = {
  uncomplete: number;
  sortTodosBy: Etodos;
  setSortTodosBy: (arg:Etodos) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  uncomplete,
  sortTodosBy,
  setSortTodosBy,
  todos,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${uncomplete} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={
            classNames('filter__link',
              { selected: sortTodosBy === Etodos.ALL })
          }
          onClick={() => setSortTodosBy(Etodos.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            classNames('filter__link',
              { selected: sortTodosBy === Etodos.ACTIVE })
          }
          onClick={() => setSortTodosBy(Etodos.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            classNames('filter__link',
              { selected: sortTodosBy === Etodos.COMPLETED })
          }
          onClick={() => setSortTodosBy(Etodos.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'is-invisible': uncomplete === todos.length },
        )}
        disabled={uncomplete === todos.length}
        onClick={() => setSortTodosBy(Etodos.CLEAR)}
      >
        Clear completed
      </button>
    </footer>

  );
};
