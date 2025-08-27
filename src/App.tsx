/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import cn from 'classnames';
import { Footer } from './components/Footer/Footer';
import { TodoFilter } from './types/TodoFilter';

function preperedData(dataTodos: Todo[], groupBy: string): Todo[] {
  let visibleTodos = [...dataTodos];

  visibleTodos = visibleTodos.filter((todos: Todo) => {
    switch (groupBy) {
      case TodoFilter.Active:
        return todos.completed === false;

      case TodoFilter.Completed:
        return todos.completed === true;

      default:
        return true;
    }
  });

  return visibleTodos;
}

export const App: React.FC = () => {
  const [todosDataFromServer, setodosDataFromServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingStartWindow, setLoadingStartWindow] = useState<boolean>(false);
  const [groupBy, setGroupBy] = useState<TodoFilter>(TodoFilter.All);

  const visibleData = preperedData(todosDataFromServer, groupBy);

  const loadTodos = () => {
    setErrorMessage('');
    setLoadingStartWindow(true);
    getTodos()
      .then((todosFromServer: Todo[]) => {
        setodosDataFromServer(todosFromServer);
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoadingStartWindow(false));
  };

  const errorTimeOut = (errorNotification: string) => {
    let timerId: NodeJS.Timeout | number | undefined;

    if (errorNotification) {
      timerId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  };

  const handleGroupBy = (typeGroupBy: TodoFilter) => {
    setGroupBy(typeGroupBy);
  };

  const completedCount = useMemo(() => {
    return todosDataFromServer.filter(todo => !todo.completed).length;
  }, [todosDataFromServer]);

  const isShowElement = !loadingStartWindow && todosDataFromServer.length > 0;

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    errorTimeOut(errorMessage);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {isShowElement && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {isShowElement && <TodoList visibleData={visibleData} />}
        {/* Hide the footer if there are no todos */}

        {isShowElement && (
          <Footer
            completedCount={completedCount}
            onHandleGroupBy={handleGroupBy}
            groupBy={groupBy}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage.length },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
