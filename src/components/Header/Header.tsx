import classNames from 'classnames';
import React from 'react';

interface Props {
  allCompleted: boolean;
}

export const Header: React.FC<Props> = ({ allCompleted }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onSubmit={event => event.preventDefault()}
        />
      </form>
    </header>
  );
};
