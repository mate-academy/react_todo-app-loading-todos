import React, { RefObject } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  newTodoField: RefObject<HTMLInputElement>,
  setShowError: (val: Errors) => void,
};

export const NewTodo: React.FC<Props> = ({ newTodoField, setShowError }) => {
  function submitForm(event: React.FormEvent) {
    event.preventDefault();
    setShowError(Errors.Add);
  }

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      >
        {}
      </button>

      <form
        onSubmit={submitForm}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          style={{ outline: 0 }}
        />
      </form>
    </header>
  );
};
