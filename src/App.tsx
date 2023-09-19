/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Status, Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { getFilteredTodos } from './utils/functions';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 11457;
const initialTodos: Todo[] = [];

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>(initialTodos);
  const [filterBy, setFilterBy] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  const filteredTodos = getFilteredTodos(todoList, filterBy);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodoList)
      .catch((error) => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
    const timerId = setInterval(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const activeTodosCount = todoList
    .filter(({ completed }) => completed === false).length;

  const completedTodosCount = todoList
    .filter(({ completed }) => completed === true).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {activeTodosCount > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

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
          {filteredTodos && (
            filteredTodos.map(todo => (
              <TodoItem todo={todo} />
            ))
          )}
        </section>

        {/* Hide the footer if there are no todos */}
        {todoList.length !== 0 && (
          <TodoFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
