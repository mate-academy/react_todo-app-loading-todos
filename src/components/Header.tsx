import React from 'react';
import classNames from 'classnames';

type Props = {
  activeTodo: boolean;
};

export const Header: React.FC<Props> = ({ activeTodo }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: activeTodo,
        })}
        data-cy="ToggleAllButton "
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
