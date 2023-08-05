import classNames from 'classnames';
import { useContext, useMemo } from 'react';

import { FilterBy } from '../../types/FilterBy';
import { TodosContext } from '../../context/TodoContext';

export const TodoFooter: React.FC = () => {
  const {
    todos,
    filterBy,
    setFilterBy,
    deleteTodo,
    setIsLoading,
  } = useContext(TodosContext);

  const someCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const handleFiltering = (value: FilterBy) => {
    if (value === filterBy) {
      return;
    }

    setFilterBy(value);
  };

  const deleteComplitedTodos = async () => {
    setIsLoading(true);
    const completedTodos = [...todos].filter(todo => todo.completed);

    const newTodos = await Promise.all(completedTodos.map(todo => {
      return deleteTodo(todo.id);
    }));

    setIsLoading(false);

    return newTodos;
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={classNames(
                'filter__link',
                { selected: filterBy === FilterBy.ALL },
              )}
              onClick={() => handleFiltering(FilterBy.ALL)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link',
                { selected: filterBy === FilterBy.ACTIVE },
              )}
              onClick={() => handleFiltering(FilterBy.ACTIVE)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link',
                { selected: filterBy === FilterBy.COMPLETED },
              )}
              onClick={() => handleFiltering(FilterBy.COMPLETED)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className={classNames(
              'todoapp__clear-completed',
              { 'todoapp__clear-hidden': !someCompleted },
            )}
            onClick={deleteComplitedTodos}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
