/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorMessage, FilterType, Todo } from './types/Types';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        setErrorMessage(ErrorMessage.LOAD);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />

      <div className="todoapp__content">
        {todos.length > 0 && <TodoList visibleTodos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
