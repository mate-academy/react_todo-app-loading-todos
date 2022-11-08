import React, { useEffect, useRef, useState } from 'react';
import { createTodo } from '../../api/todos';

type Props = {
  hasTodos: boolean;
};

export const NewTodo: React.FC<Props> = ({ hasTodos }) => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

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

      <form onSubmit={async (event) => {
        event.preventDefault();
        await createTodo(query);
      }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What needs to be done?"
        />
      </form>
    </>
  );
};
