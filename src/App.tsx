/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './Components/Filter';
import { ForComletedTodo } from './types/enumFilter';

const USER_ID = 11511;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [condition, setCondition] = useState(ForComletedTodo.All);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError('Something went wrong');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => todos.filter(({ completed }) => {
    switch (condition) {
      case ForComletedTodo.Active:
        return !completed;
      case ForComletedTodo.Completed:
        return completed;
      default:
        return 1;
    }
  }), [condition, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {/* This is a completed todo */}
          {filteredTodos.map(todo => {
            const { title, completed, id } = todo;

            return (
              <div
                className={cn('todo', {
                  completed,
                })}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                <span className="todo__title">{title}</span>

                {/* Remove button appears only on hover */}
                <button type="button" className="todo__remove">×</button>

                {/* overlay will cover the todo while it is being updated */}
                <div className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <Filter condition={condition} setCondition={setCondition} />

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >

        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}

        {/* show only one message at a time */}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
