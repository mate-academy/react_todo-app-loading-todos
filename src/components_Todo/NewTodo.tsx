/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

interface Prors {
  newTodoField: React.RefObject<HTMLInputElement>;
}

export const NewTodo: React.FC<Prors> = ({ newTodoField }) => {
  const [newTodo, setNewTodo] = useState('');

  const creareTodo = (event: React.SetStateAction<string>) => {
    setNewTodo(event);
  };

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={() => creareTodo}
        />
      </form>
    </header>
  );
};
