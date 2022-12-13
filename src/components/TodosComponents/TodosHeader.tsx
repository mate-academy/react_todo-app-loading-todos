/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  getErrorStatus: (errStatus: string) => void,
};

export const TodosHeader: React.FC<Props> = ({
  newTodoField,
  getErrorStatus,
}) => {
  const [query, setQuery] = useState('');

  const SubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() === '') {
      getErrorStatus('Title cant be empty');
    }

    setQuery('');
  };

  return (
    <>
      <header className="todoapp__header">
        <button
          data-cy="ToggleAllButton"
          type="button"
          className="todoapp__toggle-all active"
        />

        <form
          onSubmit={SubmitForm}
        >
          <input
            data-cy="NewTodoField"
            type="text"
            ref={newTodoField}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </form>
      </header>
    </>
  );
};
