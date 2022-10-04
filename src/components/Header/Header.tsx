import React from 'react';
import classNames from 'classnames';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  hasCompletedTodos: boolean;
};

export const Header: React.FC<Props> = ({
  newTodoField,
  hasCompletedTodos,
}) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="active"
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: !hasCompletedTodos },
        )}
      />

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
