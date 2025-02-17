import React from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  onFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: string;
};

export const Footer: React.FC<Props> = ({ todos, onFilter, filter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(Value => (
          <a
            key={Value}
            href="#/"
            className={cn('filter__link', {
              selected: filter === Value,
            })}
            data-cy={`FilterLink${Value}`}
            onClick={() => onFilter(Value)}
          >
            {Value}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
