/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import * as todoApi from './api/todos';
import { Todo } from './types/Todo';
import { StatusFilter, ErrorMessage } from './types/enums';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [filter, setFilter] = useState<StatusFilter>(StatusFilter.All);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage(ErrorMessage.None);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const loadTodos = () => {
    setErrorMessage(ErrorMessage.None);
    todoApi
      .getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(() => setErrorMessage(ErrorMessage.Load));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === StatusFilter.Active) {
        return !todo.completed;
      }

      if (filter === StatusFilter.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filter]);

  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = inputValue.trim();

    if (!trimmedTitle) {
      setErrorMessage(ErrorMessage.EmptyTitle);

      return;
    }

    setErrorMessage(ErrorMessage.None);
    todoApi
      .addTodo({
        userId: todoApi.USER_ID,
        title: trimmedTitle,
        completed: false,
      })
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setInputValue('');
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Add);
      });
  };

  if (!todoApi.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleFormSubmit}
          hasTodos={todos.length > 0}
        />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
