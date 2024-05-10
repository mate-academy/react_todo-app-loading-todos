import classNames from 'classnames';
import React from 'react';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  allTodosCompleted: boolean;
}

export const Header: React.FC<Props> = ({ inputRef, allTodosCompleted }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames("todoapp__toggle-all",
          { "active": allTodosCompleted }
        )}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
