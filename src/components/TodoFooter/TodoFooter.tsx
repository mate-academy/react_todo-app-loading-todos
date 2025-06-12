import cn from 'classnames';
import { useMemo } from 'react';
import { FilterParams } from '../../types/FilterParams';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filter: FilterParams;
  setFilter: (param: FilterParams) => void;
};

export const TodoFooter: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const anyCompletedTodo = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  const itemsLeft = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${itemsLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.entries(FilterParams).map(([key, value]) => {
          return (
            <a
              key={value}
              href={`#/${value}`}
              className={cn('filter__link', { selected: filter === value })}
              data-cy={`FilterLink${key}`}
              onClick={() => setFilter(value)}
            >
              {key}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!anyCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
