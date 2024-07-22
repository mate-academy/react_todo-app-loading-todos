import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { filteredTodos } from '../../utils/filteredTodos';
import { Actions } from '../../types/Actions';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  handleAction: (arg: Actions) => void;
};

export const FooterTodos: React.FC<Props> = ({ todos, handleAction }) => {
  const [selected, setSelected] = useState({
    all: true,
    active: false,
    completed: false,
  });

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {filteredTodos(todos, Actions.ACTIVE).length} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: selected.all,
              })}
              data-cy="FilterLinkAll"
              onClick={() => {
                setSelected({ all: true, active: false, completed: false });
                handleAction(Actions.ALL);
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: selected.active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => {
                setSelected({ all: false, active: true, completed: false });
                handleAction(Actions.ACTIVE);
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: selected.completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => {
                setSelected({ all: false, active: false, completed: true });
                handleAction(Actions.COMPLETED);
              }}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!todos.some(todo => todo.completed === true)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
