import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { deleteTodo } from '../../../api/todos';
import { TypeChange } from '../../../types/TypeChange';
import { Filter } from '../../../types/Filter';
import { TodoContext } from '../../../context/TodoContext';
import { Error } from '../../../types/Error';

export const FilterComponent: React.FC = () => {
  const {
    todos,
    filterState,
    setAllCompletedLoader,
    handleStatusChange,
    setErrorMessage,
    setLoadError,
    setFilterState,
  } = useContext(TodoContext);

  const showClear = useMemo(() => todos.some(todo => todo.completed), [todos]);

  const handleClearAllCompleted = async () => {
    try {
      setAllCompletedLoader(true);
      await Promise.all(
        todos.map(async (todo) => {
          if (todo.completed) {
            await deleteTodo(todo.id);
          }
        }),
      );
      todos.map(todo => handleStatusChange(todo, TypeChange.deleteAll));
    } catch (_) {
      setLoadError(true);
      setErrorMessage(Error.delete);
    } finally {
      setAllCompletedLoader(false);
    }
  };

  const activeCounter = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeCounter} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            {
              selected: filterState === Filter.all,
            },
          )}
          onClick={() => setFilterState(Filter.all)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            {
              selected: filterState === Filter.active,
            },
          )}
          onClick={() => setFilterState(Filter.active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            {
              selected: filterState === Filter.completed,
            },
          )}
          onClick={() => setFilterState(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={handleClearAllCompleted}
        style={showClear
          ? { opacity: '100%' }
          : { opacity: '0%', cursor: 'default' }}
        disabled={!showClear}
      >
        Clear completed
      </button>

    </footer>
  );
};
