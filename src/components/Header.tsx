import React, { FormEvent, RefObject } from 'react';

type Props = {
  todosCount: number;
  isAllCompleted: boolean;
  newTodoTitle: string;
  newTodoInputRef: RefObject<HTMLInputElement>;
  tempTodo: boolean;
  onAddTodo: (event: FormEvent) => void;
  onToggleAll: () => void;
  setNewTodoTitle: (title: string) => void;
};

export const Header: React.FC<Props> = ({
  todosCount,
  isAllCompleted,
  newTodoTitle,
  newTodoInputRef,
  tempTodo,
  onAddTodo,
  onToggleAll,
  setNewTodoTitle,
}) => (
  <header className="todoapp__header">
    {todosCount > 0 && (
      <button
        type="button"
        className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />
    )}

    <form onSubmit={onAddTodo}>
      <input
        ref={newTodoInputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={e => setNewTodoTitle(e.target.value)}
        disabled={!!tempTodo}
      />
    </form>
  </header>
);
