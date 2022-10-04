import React from 'react';
import classNames from 'classnames';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  isActiveTodo: boolean;
};

export const Header: React.FC<Props> = ({
  newTodoField,
  isActiveTodo,
}) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          {
            active: isActiveTodo,
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
