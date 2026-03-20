import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: (Todo & { loading?: boolean; editing?: boolean })[];
  newTitle: string;
  setNewTitle: (value: string) => void;
  handleAddTodo: (e: React.FormEvent) => void;
  handleToggleAll: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({
  todos,
  newTitle,
  setNewTitle,
  handleAddTodo,
  handleToggleAll,
  inputRef,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${
          todos.length > 0 && todos.every(todo => todo.completed)
            ? 'active'
            : ''
        }`}
        data-cy="ToggleAllButton"
        disabled={todos.length === 0}
        onClick={handleToggleAll}
      />

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
