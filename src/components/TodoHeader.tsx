/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodosContext } from './Todos-Context';

export const TodoHeader: React.FC = () => {
  const { query, setQuery, setErrorMessage } = useContext(TodosContext);

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    event.preventDefault();
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (!query) {
      setErrorMessage('Title should not be empty');
    }

    event.preventDefault();
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
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
