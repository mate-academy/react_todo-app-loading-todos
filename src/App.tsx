/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useTodo } from './hooks/useTodo';

const USER_ID = 11340;

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    isChecked,
    setIsChecked,
  } = useTodo();

  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = newTodoTitle.trim();

    if (!newTitle) {
      setNewTodoTitle('');

      return;
    }

    const newTodo = {
      id: +new Date(),
      userId: USER_ID,
      title: (newTitle),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const handleCheckAllTodos = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !isChecked,
    })));
    setIsChecked(!isChecked);
  };

  const activeTodosCounter = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setIsChecked(false);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: activeTodosCounter > 0,
            })}
            onChange={handleCheckAllTodos}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        {todos && (
          <>
            <TodoList todos={todos} />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${activeTodosCounter} item${activeTodosCounter === 1 ? '' : 's'} left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <TodoFilter />

              {/* don't show this button if there are no completed todos */}
              {completedTodosCounter > 0 && (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={clearCompletedTodos}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
