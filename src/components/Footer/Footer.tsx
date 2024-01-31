import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { Todo } from '../../types/Todo';

export const Footer = () => {
  const {
    filterField,
    setFilterField,
    todos,
    setTodos,
  } = useContext(TodosContext);

  const removeCompletedTodos = () => setTodos(
    (currentTodos: Todo[]) => currentTodos.filter(todo => !todo.completed),
  );

  const counterOfNonCompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${counterOfNonCompletedTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => setFilterField('All')}
          className={classNames('filter__link', {
            selected: filterField === 'All',
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => setFilterField('Active')}
          className={classNames('filter__link', {
            selected: filterField === 'Active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => setFilterField('Completed')}
          className={classNames('filter__link', {
            selected: filterField === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        onClick={removeCompletedTodos}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={counterOfNonCompletedTodos === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
