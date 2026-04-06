import React, { useCallback, useEffect, useRef } from 'react';
type Props = {
  title: string;
  setTitle: (title: string) => void;
};

export const TodoAppHeader = React.memo<Props>(({ title, setTitle }) => {
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const inputTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [],
  );

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={inputTitle}
          ref={titleField}
        />
      </form>
    </header>
  );
});

TodoAppHeader.displayName = 'TodoAppHeader';
