/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { UserWarning } from './components/UserWarning';
import { getTodos } from './api/todos';
import { AppTodoContext } from './components/AppTodoContext/AppTodoContext';
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';
import { Error } from './components/Error/Error';
import { ErrorType } from './components/Error/Error.types';
import { USER_ID } from './react-app-env';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from "./components/TodoFilter/TodoFilter";

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
    todosCount,
    setTodosCount,
    setErrorMessage,
    errorMessage,
  } = useContext(AppTodoContext);

  const getAllTodos = async () => {
    try {
      const allTodos = await getTodos(USER_ID);

      setTodos(allTodos);
      setTodosCount(allTodos.length);
    } catch {
      setErrorMessage(ErrorType.getTodosError);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          <NewTodoForm />
        </header>

        {todos.length !== 0 && <TodoList />}

      </div>

      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${todosCount} items left`}
        </span>

        {/* Active filter should have a 'selected' class */}
        <TodoFilter />

        {/* don't show this button if there are no completed todos */}
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage !== ErrorType.NoError && <Error />}
    </div>
  );
};
