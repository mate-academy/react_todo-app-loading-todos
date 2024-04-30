import { FC, useEffect, useRef, useState } from 'react';
import React = require('react');

import { TodoType } from '../types/Todo';

type Props = {
  todos: TodoType[];
  addTodo: (newTodoTitle: string) => void;
};

export const Header: FC<Props> = ({ todos, addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const newTodoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoInputRef.current) {
      newTodoInputRef.current.focus();
    }
  }, []);
  const handleNewTodoForm = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodoTitle);
    setNewTodoTitle('');
  };

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

      {/* Add a todos on form submit */}
      <form onSubmit={handleNewTodoForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todos"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => {
            setNewTodoTitle(e.target.value);
          }}
          autoFocus
        />
      </form>
    </header>
  );
};
