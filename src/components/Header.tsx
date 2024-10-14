import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface HeaderProps {
  todos: Todo[];
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  newTodo: Omit<Todo, 'id'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  addTodo,
  newTodo,
  onChange,
}) => {
  const isActive: boolean =
    todos.map(todo => todo.completed).length === todos.length;

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isActive,
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo.title}
          onChange={onChange}
          autoFocus
        />
      </form>
    </header>
  );
};
