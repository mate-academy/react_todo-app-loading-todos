import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  position: string,
  onPositionChange: (newPosition: string) => void,
  positionValues: string[],
  completedClear: () => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  position,
  onPositionChange,
  positionValues,
  completedClear,
}) => {
  const todosCounter = todos.filter((todo: Todo) => todo.completed).length;
  const isCompleted = todos.find(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todosCounter === 1
          ? `${todosCounter} item left`
          : `${todosCounter} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {positionValues.map((currPosition) => (
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className={classNames(
              'filter__link',
              { selected: currPosition === position },
            )}
            onClick={() => onPositionChange(currPosition)}
            key={currPosition}
          >
            {currPosition}
          </a>
        ))}
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        disabled={!isCompleted}
        onClick={completedClear}
      >
        Clear completed
      </button>
    </footer>
  );
};
