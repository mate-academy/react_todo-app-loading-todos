import React from 'react';
import { Filter } from '../../types/FilterType';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  filterField: Filter;
  setFilteredField: React.Dispatch<React.SetStateAction<Filter>>;
  todos: Todo[];
  onDeleteAllCompleted: () => void;
};

export const Footer: React.FC<Props> = props => {
  const { filterField, setFilteredField, todos, onDeleteAllCompleted } = props;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(value => (
          <a
            key={value}
            href={`#/${value}`}
            className={classNames('filter__link', {
              selected: filterField === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => setFilteredField(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={onDeleteAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
