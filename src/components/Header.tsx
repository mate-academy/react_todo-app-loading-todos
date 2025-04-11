import React from 'react';

type Props = {
  todos: { completed: boolean }[];
  handleAddTodo: () => void;
  newTodoTitle: string;
  setNewTodoTitle: (value: string) => void;
  isLoading: boolean;
};

export const Header: React.FC<Props> = ({
  todos,
  handleAddTodo,
  newTodoTitle,
  setNewTodoTitle,
  isLoading,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.every(todo => todo.completed) && todos.length > 0 ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
