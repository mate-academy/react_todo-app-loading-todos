import classNames from 'classnames';
import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  setFilter: (filter: string) => void,
};

export const Footer:React.FC<Props> = ({ todos, filter, setFilter }) => {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length}
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filters.All,
          })}
          onClick={() => {
            setFilter(Filters.All);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filters.Active,
          })}
          onClick={() => {
            setFilter(Filters.Active);
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filters.Completed,
          })}
          onClick={() => {
            setFilter(Filters.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      {completedTodos.length > 0 && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
