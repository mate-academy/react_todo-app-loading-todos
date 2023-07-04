/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoApp } from './components/TodoApp';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { todosApi } from './api/todos';

const USER_ID = 10914;

export const App: React.FC = () => {
  const [usersTodos, setUsersTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    todosApi.getTodos(USER_ID)
      .then(setUsersTodos)
      .catch(() => setErrorMessage('Unable to load Todos'));
  }, []);

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 3000);
  }, [errorMessage]);

  let visibleTodos = [...usersTodos];

  if (filter === 'all') {
    visibleTodos = [...usersTodos];
  }

  if (filter === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filter === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={visibleTodos} />

        <TodoApp todos={visibleTodos} />

        {(visibleTodos.length > 0 || filter !== 'all')
        && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            todosNumber={usersTodos.length}
            visibleTodos={visibleTodos}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
