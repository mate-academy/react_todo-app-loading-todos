import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  countOfTodos: number;
};

export const TodoHeader: React.FC<Props> = React.memo(({
  newTodoField,
  countOfTodos,
}) => {
  return (
    <header className="todoapp__header">
      {countOfTodos > 0
      && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
          aria-label="active"
        />
      )}

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
