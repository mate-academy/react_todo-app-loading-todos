import React from 'react';

type TodoHeaderProps = {
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  isAdding: boolean; // змінив назву на більш зрозумілу
  onAdd: () => void;
};

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  newTodoTitle,
  setNewTodoTitle,
  isAdding, // змінив з handleAdd на isAdding
  onAdd,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodoTitle.trim()) {
      onAdd();
    }
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
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          disabled={isAdding}
          autoFocus
        />
      </form>
    </header>
  );
};
