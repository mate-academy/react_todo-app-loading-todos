import React, { useCallback, useRef, useState } from 'react';
import { ERROR } from '../../types/enums';

type Props = {
  onAdd: (value: string) => Promise<unknown>;
};

export const Header: React.FC<Props> = ({ onAdd }) => {
  const [loading, setLoading] = useState(false);
  const inputField = useRef<HTMLInputElement>(null);
  // console.log('render header')

  const addItem = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inputField.current) {
        try {
          setLoading(true);
          const data = await onAdd(inputField.current.value);

          if (data) {
            inputField.current.value = '';
          }

          return data;
        } catch (err) {
          return;
        } finally {
          setLoading(false);
        }
      }

      throw new Error(ERROR.add);
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
      <form onSubmit={addItem}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputField}
          disabled={loading}
        />
      </form>
    </header>
  );
};
