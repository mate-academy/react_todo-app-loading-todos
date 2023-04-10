import { FC, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { getTodos, getTodosByStatus } from '../../api/todos';
import { USER_ID } from '../../react-app-env';
import { AppTodoContext } from '../AppTodoContext/AppTodoContext';
import { ErrorType } from '../Error/Error.types';

enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const Filters = {
  [FilterType.All]: getTodos(USER_ID),
  [FilterType.Active]: getTodosByStatus(USER_ID, false),
  [FilterType.Completed]: getTodosByStatus(USER_ID, true),
};

export const TodoFilter: FC = () => {
  const { setTodos, setErrorMessage } = useContext(AppTodoContext);
  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FilterType.All,
  );

  const handleFiltration = async (criteria: FilterType) => {
    if (currentFilter === criteria) {
      return;
    }

    setErrorMessage(ErrorType.NoError);

    try {
      setTodos(await Filters[criteria]);
      setCurrentFilter(criteria);
    } catch {
      setErrorMessage(ErrorType.getTodosError);
    }
  };

  return (
    <nav className="filter">
      {Object.values(FilterType).map(filter => (
        <button
          type="button"
          aria-label="filter button"
          key={filter as string}
          className={classNames(
            'filter__link',
            { selected: currentFilter === filter },
          )}
          onClick={() => handleFiltration(filter)}
        >
          {[filter]}
        </button>
      ))}
    </nav>
  );
};
