import React, { RefObject } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  newTodoField: RefObject<HTMLInputElement>,
  setShowError: (str: string) => void,
};

export const NewTodo: React.FC<Props> = ({ newTodoField, setShowError }) => {
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
        onSubmit={(e) => {
          e.preventDefault();
          setShowError(Errors.Add);
        }}
      >
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
