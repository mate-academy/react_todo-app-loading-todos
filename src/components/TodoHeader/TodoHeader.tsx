import React from 'react';
import cn from 'classnames';

type Props = {
  isAnyTodoActive: boolean,
};

export const TodoHeader: React.FC<Props> = ({
  isAnyTodoActive,
}) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="ToggleAllButton"
        type="button"
        className={cn('todoapp__toggle-all', {
          active: !isAnyTodoActive,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit (next task) */}
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
