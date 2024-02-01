import classNames from 'classnames';
import { useContext, useMemo } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { Todo } from '../../types/Todo';

export const Footer = () => {
  const {
    filterBy,
    setFilterBy,
    todos,
    setTodos,
  } = useContext(TodosContext);

  const deleteCompleted = () => setTodos(
    (currentTodos: Todo[]) => currentTodos.filter(todo => !todo.completed),
  );

  const todosLeft = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosLeft} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => setFilterBy('All')}
          className={classNames('filter__link', {
            selected: filterBy === 'All',
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => setFilterBy('Active')}
          className={classNames('filter__link', {
            selected: filterBy === 'Active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => setFilterBy('Completed')}
          className={classNames('filter__link', {
            selected: filterBy === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        onClick={deleteCompleted}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todosLeft === todos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
