import React, { useRef, useEffect } from 'react';

type Props = {
  hasTodos: boolean;
};

export const NewTodo: React.FC<Props> = ({ hasTodos }) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <>
      {hasTodos && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
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
        />
      </form>
    </>
  );
};
