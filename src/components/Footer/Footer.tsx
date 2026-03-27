import classNames from 'classnames';
import React, { useContext } from 'react';
import { TodoContext } from '../../store/TodoContext';
import { Filter } from '../../types/Filters';

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos } = useContext(TodoContext);

  const filters: Filter[] = ['All', 'Active', 'Completed'];
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(item => {
          return (
            <a
              key={item}
              href={`#/${item}`}
              data-cy={`FilterLink${item}`}
              className={classNames('filter__link', {
                selected: filter === item,
              })}
              onClick={() => setFilter(item)}
            >
              {item}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={() => {}}
      >
        Clear completed
      </button>
    </footer>
  );
};
