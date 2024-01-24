import React, { useState, useContext } from 'react';

import { Context } from '../../Context';
import { ErrorMessage } from '../../types/ErrorMessage';

export const Header = () => {
  const [query, setQuery] = useState('');
  const { handleErrorChange } = useContext(Context);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    handleErrorChange(ErrorMessage.NULL);
    setQuery(value);
  };

  const addingTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      handleErrorChange(ErrorMessage.EMPTY_TITLE);
      setQuery('');

      return;
    }

    handleErrorChange(ErrorMessage.UNABLE_TO_ADD);
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addingTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
