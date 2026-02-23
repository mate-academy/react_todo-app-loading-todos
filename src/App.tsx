/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorMessage } from './types/ErrorMessage';

import { ErrorNotification } from './components/ErrorNotification';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [query, setQuery] = useState('');

  const todoFieldRef = React.useRef<HTMLInputElement>(null);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    const loadTodos = async () => {
      setErrorMessage('');

      try {
        const data = await todoService.getTodos();

        setTodos(data);
      } catch {
        showError(ErrorMessage.Load);
      }
    };

    loadTodos();
    todoFieldRef.current?.focus();
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  const hadleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          ref={todoFieldRef}
          query={query}
          setQuery={setQuery}
          onSubmit={hadleSubmit}
          isToggleAllActive={
            todos.length > 0 && todos.every(todo => todo.completed)
          }
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              activeTodosCount={activeTodosCount}
              filter={filter}
              setFilter={setFilter}
              hasCompleted={todos.some(todo => todo.completed)}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
