import React, { useState } from 'react';

import { LocalTodosArrayType } from '../types/Todo';

type Props = {
  todos: LocalTodosArrayType;
  addTodo: (newTodoTitle: string) => void;
  setFailCaseStates: (prevCases: {}) => void;
};

export default function TodoForm({ todos, addTodo, setFailCaseStates }: Props) {
  const [newPostTitle, setNewPostTitle] = useState<string>('');

  function handleTodoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPostTitle.trim() === '') {
      setFailCaseStates((prevCases: {}) => ({
        ...prevCases,
        titleLength: true,
      }));
    } else {
      addTodo(newPostTitle);
      setFailCaseStates((prevCases: {}) => ({
        ...prevCases,
        titleLength: false,
      }));
      setNewPostTitle('');
    }
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={
          'todoapp__toggle-all ' +
          (todos.every(({ completed }) => completed) ? 'active' : '')
        }
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleTodoSubmit}>
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
