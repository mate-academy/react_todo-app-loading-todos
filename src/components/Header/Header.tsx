import classNames from 'classnames';
import React, { memo, useEffect, useRef } from 'react';

type Props = {
  todosLength: boolean;
};

export const Header: React.FC<Props> = memo(({ todosLength }) => {
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current === null) {
      return;
    }

    inputField.current.focus();
  }, [todosLength]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todosLength && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: false })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form>
        <input
          ref={inputField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});

Header.displayName = 'Header';
