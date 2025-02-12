import React, { FormEventHandler } from 'react';

interface Props {
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  newTodoInputRef: React.RefObject<HTMLInputElement>;
  newTodo: string;
  setNewTodo: (value: string) => void;
}

export const Header: React.FC<Props> = ({
  handleSubmit,
  newTodoInputRef,
  newTodo,
  setNewTodo,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />
      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoInputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
};
