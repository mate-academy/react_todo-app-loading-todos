/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
// import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { Header } from './components/Loader/header';
import { TodoList } from './components/Loader/TodoList/TodoList';
import { Footer } from './components/Loader/Footer/Footer';
import { Loader } from './components/Loader';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<Filter>('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage('');
      setError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const visibleTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {isLoading && <Loader />}
        {todos.length > 0 && !isLoading && (
          <TodoList todos={visibleTodos} isLoading={isLoading} />
        )}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer todos={todos} setFilterStatus={setFilterStatus} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`
        notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}
        `}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
        {/* Unable to load todos
        <br />
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
