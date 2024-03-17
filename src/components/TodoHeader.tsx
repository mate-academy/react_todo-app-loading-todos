/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodosContext } from './Todos-Context';

export const TodoHeader: React.FC = () => {
  const { query, setQuery, setErrorMessage } = useContext(TodosContext);

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!query) {
      setErrorMessage('Title should not be empty');
    }

    setQuery(event.target.value);
    event.preventDefault();
    setQuery('');
  };

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
          onChange={handlerInput}
          value={query}
        />
      </form>
    </header>
  );
};
