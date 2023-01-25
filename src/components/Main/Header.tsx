/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { memo } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosList: Todo[],
  newTodoField: React.RefObject<HTMLInputElement>,
  setIsError: (value: boolean) => void,
};

export const Header: React.FC<Props> = memo(({
  todosList,
  newTodoField,
  setIsError,
}) => {
  return (
    <header className="todoapp__header">
      {todosList.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={() => setIsError(false)}
        />
      </form>
    </header>
  );
});
