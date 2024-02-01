/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodoContext/TodoContext';
import { USER_ID } from '../variables/UserID';

export const Header: React.FC = () => {
  const {
    addTodo,
    makeAllCompleted,
    todos,
  } = useContext(TodosContext);

  const [todoTitle, setTodoTitle] = useState('');

  const isAllTodosCompleted = todos.every(({ completed }) => completed);

  const handleToggleAll = () => {
    makeAllCompleted(todos);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const newTodo = {
      userId: USER_ID,
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodoTitle('');
    addTodo(newTodo, event);
    event.preventDefault();
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}

      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        disabled={!isAllTodosCompleted}
        onClick={handleToggleAll}
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={(event) => handleOnSubmit(event)}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
