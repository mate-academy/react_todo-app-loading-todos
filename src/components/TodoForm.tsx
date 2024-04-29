import React, { useState } from 'react';

import { LocalTodosArrayType } from '../types/Todo';

type Props = {
  displayTodos: LocalTodosArrayType;
  addTodo: (newTodoTitle: string) => void;
};

export default function TodoForm({ displayTodos, addTodo }: Props) {
  const [newPostTitle, setNewPostTitle] = useState<string>('');

  function handleNewTodoForm(e: React.FormEvent) {
    e.preventDefault();
    addTodo(newPostTitle);
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={
          'todoapp__toggle-all ' +
          (displayTodos.every(({ completed }) => completed) ? 'active' : '')
        }
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleNewTodoForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newPostTitle}
          onChange={({ target }) => {
            setNewPostTitle(target.value);
          }}
          autoFocus
        />
      </form>
    </header>
  );
}
