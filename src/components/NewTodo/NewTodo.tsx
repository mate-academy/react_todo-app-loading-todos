import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  todos: Todo[];
  leftTodosLength: number;
};

export const NewTodo: React.FC<Props> = ({
  newTodoField,
  todos,
  leftTodosLength,
}) => {
  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          aria-label="toggle-all-button"
          data-cy="ToggleAllButton"
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: leftTodosLength === 0 },
          )}
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
