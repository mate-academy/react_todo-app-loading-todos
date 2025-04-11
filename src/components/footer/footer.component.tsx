import React from 'react';
import { FooterTypes } from './footer.types';
import { text } from '../../constants/text';
import classNames from 'classnames';
import { Statuses } from '../../types/Statuses';

export const FooterComponent: React.FC<FooterTypes> = ({
  todos,
  selectedStatus,
  handleSelectTodo,
}) => {
  const todoCounter = todos.filter(todo => !todo.completed).length;

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todoCounter} items left
        </span>
        <nav className="filter" data-cy="Filter">
          {Object.values(Statuses).map(status => (
            <a
              key={status}
              onClick={() => handleSelectTodo(status)}
              href={`#/${status}`}
              className={classNames('filter__link', {
                selected: selectedStatus === status,
              })}
              data-cy={`FilterLink${text[status]}`}
            >
              {text[status]}
            </a>
          ))}
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          {text.clearCompleted}
        </button>
      </footer>
    )
  );
};
