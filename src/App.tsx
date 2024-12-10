/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { ErrorNotification } from './ErrorNotification';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

import { getTodos } from '../src/api/todos';
import { Todo } from '../src/types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleError = (errorType: string) => {
    switch (errorType) {
      case 'load':
        setError('Unable to load todos');
        break;
      case 'add':
        setError('Unable to add a todo');
        break;
      case 'delete':
        setError('Unable to delete a todo');
        break;
      case 'update':
        setError('Unable to update a todo');
        break;
      default:
        setError('An unknown error occured');
    }
    setIsErrorVisible(true);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
        setError(null);
      } catch (err) {
        handleError('load');
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={todos} setTodos={setTodos} filter={filter}/>
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (

        <Footer todos={todos} filter={filter} setFilter={setFilter}/>
        )}
      </div>
      <ErrorNotification
        error={isErrorVisible ? error : null}
        onClose={() => {
          setIsErrorVisible(false);
          setError(null);
        }}
      />
    </div>
  );
};
