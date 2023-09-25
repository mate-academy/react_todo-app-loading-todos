/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoStatus, Todo } from './types';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/Todolist';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { USER_ID, DOWNLOAD_ERROR } from './utils/constants';
import { countUncompletedTodos } from './utils/countUncompletedTodos';

export const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [filterByStatus, setFilterByStatus] = useState(TodoStatus.All);
  const [errorMessage, setErrorMessage] = useState('');

  const visibleTodos = useMemo(() => getFilteredTodos(
    filterByStatus, todoItems,
  ), [filterByStatus, todoItems]);

  const uncompletedTodos = countUncompletedTodos(todoItems);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodoItems)
      .catch((error) => {
        // eslint-disable-next-line no-console
        setErrorMessage(DOWNLOAD_ERROR);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              // value={value}
              // onChange={event => addTodo(event.target.value)}
            />
          </form>
        </header>

        {visibleTodos && (
          <TodoList
            todos={visibleTodos}
          />
        )}
        <section className="todoapp__main">
          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loading state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        {todoItems && (
          <TodoFilter
            selectStatus={setFilterByStatus}
            status={filterByStatus}
            uncompletedTodos={uncompletedTodos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={classNames(
          'notification', 'is-danger', 'is-light', 'has-text-weight-normal', {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}

      </div>
    </div>
  );
};
