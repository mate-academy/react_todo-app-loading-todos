import React from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
};

export const NewTodo: React.FC<Props> = React.memo(({ newTodoField }) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="All todos active"
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
