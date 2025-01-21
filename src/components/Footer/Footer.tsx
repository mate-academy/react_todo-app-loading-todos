import React from 'react';
import { FilterType } from '../../types/FilterType';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  sortTodoBy: FilterType;
  onClick: (value: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ todos, sortTodoBy, onClick }) => {
  const visibileTodo = todos.filter(todo => !todo.completed);
  const disabledBtn = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {visibileTodo.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(typeItem => (
          <a
            href={`#/${typeItem}`}
            key={typeItem}
            className={classNames('filter__link', {
              selected: sortTodoBy === typeItem,
            })}
            data-cy={`FilterLink${typeItem}`}
            onClick={() => onClick(typeItem)}
          >
            {typeItem}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!disabledBtn}
      >
        Clear completed
      </button>
    </footer>
  );
};
