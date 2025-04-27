import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  allTodos: Todo[];
  updateAll: () => Promise<void>;
  handleAdd: () => Promise<void>;
  editTodo: string;
  setEditTodo: (editTodo: string) => void;
}

export const Header: React.FC<Props> = ({
  allTodos,
  updateAll,
  handleAdd,
  editTodo,
  setEditTodo,
}) => {
  return (
    <header className="todoapp__header">
      {allTodos.length !== 0 && (
        <button
          onClick={() => updateAll()}
          type="button"
          className={`todoapp__toggle-all ${allTodos.every(todo => todo.completed) ? 'active' : ''}`}
          data-cy="ToggleAllButton"
        />
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
          data-cy="NewTodoField"
          type="text"
          autoFocus={true}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
