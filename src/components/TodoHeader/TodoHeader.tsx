/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo } from 'react';

export type Props = {
  newTodoField: React.RefObject<HTMLInputElement>
};

export const TodoHeader: React.FC<Props> = memo(({ newTodoField }) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
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
});
