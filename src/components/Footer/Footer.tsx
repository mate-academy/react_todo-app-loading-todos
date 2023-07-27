import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';
import { getFilteredTodos } from '../../utils/TodoFilter';

type Props = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Footer: React.FC<Props> = ({ todos, setTodos }) => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    if (filterType) {
      setTodos(getFilteredTodos(todos, filterType));
    }
  }, [filterType]);
  const completedTodo = todos.filter(todo => todo.completed === false);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${completedTodo.length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            'filter__link selected': filterType === FilterType.ALL,
          })}
          onClick={() => setFilterType(FilterType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            'filter__link selected': filterType === FilterType.ACTIVE,
          })}
          onClick={() => setFilterType(FilterType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            'filter__link selected': filterType === FilterType.COMPLETED,
          })}
          onClick={() => setFilterType(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
