import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

interface Props {
  todos: Todo[];
  handleDelete: (todo: Todo) => void;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterType>>;
  filterBy: FilterType;
}

export const TodoFooter: React.FC<Props> = ({
  todos,
  handleDelete,
  setFilterBy,
  filterBy,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => todo.completed === false).length}`} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(type => {
          const firstUpperType = type.charAt(0).toUpperCase() + type.slice(1);

          return (
            <a
              key={type}
              href={`#/${type === FilterType.All ? '' : type}`}
              className={classNames('filter__link', {
                selected: filterBy === type,
              })}
              data-cy={`FilterLink${firstUpperType}`}
              onClick={() => setFilterBy(type)}
            >
              {firstUpperType}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          todos.map(todo => {
            if (todo.completed === true) {
              handleDelete(todo);
            }
          });
        }}
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
