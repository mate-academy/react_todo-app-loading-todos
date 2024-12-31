import React from 'react';
import { Todo } from '../types/Todo';

type HeaderProps = {
  todosDb: Todo[];
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  addTodo: (e: React.FormEvent<HTMLFormElement>, title: string) => void;
};

const Header: React.FC<HeaderProps> = ({
  todosDb,
  newTodoTitle,
  setNewTodoTitle,
  addTodo,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${todosDb.every(todo => todo.completed) ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={e => addTodo(e, newTodoTitle)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
