import classNames from 'classnames';
import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  isActiveTodos: boolean;
};

export const Header: React.FC<Props> = ({ newTodoField, isActiveTodos }) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="active"
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isActiveTodos },
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
