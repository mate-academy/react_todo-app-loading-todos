/* eslint-disable curly */
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  filter: Filter,
  getFilter: (arg: Filter) => void,
  todos: Todo[] | null,
};

export const Footer: React.FC<Props> = ({
  filter,
  getFilter,
  todos,
}) => {
  const getItemsIsLeft = () => {
    let countActiveTodos = 0;

    if (!todos) return countActiveTodos;

    for (let i = 0; i < todos?.length; i += 1) {
      if (!todos[i].completed) {
        countActiveTodos += 1;
      }
    }

    return countActiveTodos;
  };

  const checkTodosHasCompletedTodo = () => {
    if (todos) {
      for (let i = 0; i < todos.length; i += 1) {
        if (todos[i].completed) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getItemsIsLeft()} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            classNames('filter__link', { selected: filter === Filter.All })
          }
          onClick={() => getFilter(Filter.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={
            classNames('filter__link', { selected: filter === Filter.Active })
          }
          onClick={() => getFilter(Filter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={
            classNames(
              'filter__link',
              { selected: filter === Filter.Completed },
            )
          }
          onClick={() => getFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        disabled={!checkTodosHasCompletedTodo()}
      >
        Clear completed
      </button>
    </footer>
  );
};
