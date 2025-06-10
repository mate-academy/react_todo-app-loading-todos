import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import cn from 'classnames';
type Props = {
  todos: Todo[];
  selectedFilter: string;
  setselectedFilter: (value: string) => void;
  handleClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  selectedFilter,
  setselectedFilter,
  handleClearCompleted,
}) => {
  const count = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(item => {
          return (
            <a
              key={item}
              href="#/All"
              className={cn('filter__link', {
                selected: selectedFilter === item,
              })}
              data-cy={`FilterLink${item}`}
              onClick={() => setselectedFilter(item)}
            >
              {item}
            </a>
          );
        })}
      </nav>

      {
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={!todos.some(todo => todo.completed)}
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      }
    </footer>
  );
};
