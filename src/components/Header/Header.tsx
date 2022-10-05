import React, { useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  hasIsActiveTodos: boolean;
};

export const Header: React.FC<Props> = ({
  newTodoField,
  hasIsActiveTodos,
}) => {
  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          {
            active: hasIsActiveTodos,
          },
        )}
        aria-label="close"
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
