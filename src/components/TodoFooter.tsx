import { Todo } from '../types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from '../api/todos';
import { useState } from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  filterTodos: (filteredTodos: Todo[]) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterTodos = () => {},
}) => {
  const [filterType, setFilterType] = useState<Filter>(Filter.All);

  const todosCount = (todosType: Filter): number => {
    const value = todosType === Filter.Active ? false : true;

    return todos.filter(todo => todo.completed === value).length;
  };

  const filterFunction = (filter: Filter) => {
    setFilterType(filter);

    switch (filter) {
      case Filter.All:
        getTodos().then(filterTodos);
        break;

      case Filter.Active:
        getActiveTodos().then(filterTodos);
        break;

      case Filter.Completed:
        getCompletedTodos().then(filterTodos);
        break;

      default:
        getTodos().then(filterTodos);
    }
  };

  const findFilterKey = (value: string): string | undefined => {
    return Object.keys(Filter).find(
      key => Filter[key as keyof typeof Filter] === value,
    );
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount(Filter.Active)} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={classNames('filter__link', {
              selected: filterType === filter,
            })}
            onClick={() => filterFunction(filter)}
            data-cy={`FilterLink${findFilterKey(filter)}`}
          >
            {findFilterKey(filter)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todosCount(Filter.Completed) === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
