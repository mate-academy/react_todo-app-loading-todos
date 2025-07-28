import React from 'react';

type Props = {
  newTodo: string;
  setNewTodo: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export const TodoHeader: React.FC<Props> = ({
  newTodo,
  setNewTodo,
  onSubmit,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
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
