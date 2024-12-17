import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const Header: React.FC<Props> = ({ todos, setTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const newTodo = {
      id: +new Date(),
      title: newTodoTitle,
      userId: 2171,
      completed: false,
    };

    if (e.key === 'Enter' && newTodoTitle.length) {
      e.preventDefault();
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        aria-label="ToggleAllButton"
      />

      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleOnChange}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
        />
      </form>
    </header>
  );
};
