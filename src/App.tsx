/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
// import { UserWarning } from './UserWarning';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { NewTodo } from './components/NewTodo';
import { USER_ID } from './constants/userid';
import { FILTERS } from './constants/filters';

// const USER_ID = 10282;

// Your userId is - 10282

// https://mate.academy/students-api/todos?userId=10282

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FILTERS>(FILTERS.ALL);

  const notCompletedTodoCount = todos.filter(todo => !todo.completed).length;
  const isCompletedExist = todos.length !== notCompletedTodoCount;
  const isAllCompleted = todos.every(todo => todo.completed);
  const maxId = Math.max(...todos.map(todo => todo.id));

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (activeFilter) {
        case FILTERS.ACTIVE:
          return !todo.completed;
        case FILTERS.COMPLETED:
          return todo.completed;
        case FILTERS.ALL:
        default:
          return true;
      }
    });
  }, [todos, activeFilter]);

  const handleErrorMessage = () => {
    setErrorMessage('');
    setIsError(false);
  };

  const loadTodos = async (): Promise<void> => {
    setIsError(false);
    try {
      const todosFromserver = await getTodos(USER_ID);

      setTodos(todosFromserver);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
      setIsError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isAllCompleted,
              })}
            />
          )}

          <NewTodo maxId={maxId} />
        </header>

        {todos && (
          <section className="todoapp__main">
            <TodoList todos={visibleTodos} />
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${notCompletedTodoCount} items left`}
            </span>

            <Filter onSetActiveFilter={setActiveFilter} />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              style={!isCompletedExist
                ? {
                  opacity: 0,
                  // pointerEvents: 'none',
                  cursor: 'default',
                }
                : {}}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={
          classNames('notification is-danger is-light has-text-weight-normal', {
            hidden: !isError,
          })
        }
      >
        <button
          type="button"
          className="delete"
          onClick={handleErrorMessage}
        />

        {errorMessage}

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
