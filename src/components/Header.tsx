import React from 'react';
import classNames from 'classnames';

export const Header: React.FC = () => {
  // Assuming props will be added later
  const activeTodosQuantity = 0; // Placeholder

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: !activeTodosQuantity,
        })}
        data-cy="ToggleAllButton"
      />

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
