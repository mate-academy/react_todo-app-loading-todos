import { useEffect, useRef, useState } from 'react';

export const SearchField: React.FC = () => {
  // #region searchField states
  const [query, setQuery] = useState('');

  // #endregion
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={query}
          onChange={ev => setQuery(ev.target.value)}
        />
      </form>
    </header>
  );
};
