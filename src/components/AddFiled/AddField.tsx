import React, { useEffect, useRef } from 'react';

interface Props {
  isTodosAvailable: boolean,
}

export const AddField: React.FC<Props> = (
  {
    isTodosAvailable,
  },
) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {isTodosAvailable && (
        <button
          data-cy="ToggleAllButton"
          aria-label="Toggle all"
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
        />
      </form>
    </header>
  );
};
