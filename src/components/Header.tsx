/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodoContext/TodoContext';
import { USER_ID } from '../variables/UserID';

export const Header: React.FC = () => {
  const {
    addTodo,
    setAllCompletedOrRemoveCompleted,
    todos,
  } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');
  const newTodo = {
    userId: USER_ID,
    id: +new Date(),
    title: todoTitle.trim(),
    completed: false,
  };
  const isAllTodosCompleted = todos.every(todo => todo.completed === true);

  const handleToggleAll = () => {
    setAllCompletedOrRemoveCompleted(todos);
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
        onSubmit={(event) => {
          setTodoTitle('');
          addTodo(newTodo, event);
        }}
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
