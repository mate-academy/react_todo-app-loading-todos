/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterType, Footer } from './components/Footer/Footer';
import cn from 'classnames';

function getVisibleTodos(todos: Todo[], filter: string) {
  let newTodosList = [...todos];

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        newTodosList = newTodosList.filter(todo => !todo.completed);
        break;
      case FilterType.Completed:
        newTodosList = newTodosList.filter(todo => todo.completed);
        break;
      case FilterType.All:
      default:
        break;
    }
  }

  return newTodosList;
}

function getCountOfActiveTodos(todos: Todo[]) {
  return todos.filter(todo => !todo.completed).length;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = setTimeout(() => {
      setErrorMessage('');
      errorTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => showErrorMessage('Unable to load todos'));

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos: Todo[] = getVisibleTodos(todos, filter);
  const countOfActiveTodos = getCountOfActiveTodos(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            countOfActiveTodos={countOfActiveTodos}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
