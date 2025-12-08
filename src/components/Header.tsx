import React from 'react';

interface HeaderProps {
  onAddTodo: (title: string) => void;
  onToggleAll: () => void;
  loading: boolean;
  allCompleted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onAddTodo,
  onToggleAll,
  loading,
  allCompleted,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem('newTodo') as HTMLInputElement;

    if (input.value.trim()) {
      onAddTodo(input.value.trim());
      input.value = '';
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        disabled={loading}
        onClick={onToggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          name="newTodo"
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={loading}
        />
      </form>
    </header>
  );
};
