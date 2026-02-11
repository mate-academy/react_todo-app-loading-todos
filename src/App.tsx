/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, getUserId } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { TodoFooter } from './components/TodoFooter';
import { Todo } from './types/Todo';
import { TodoErrors } from './components/TodoErrors';
import { FILTERS, Filter } from './constants/filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [footerFilter, setFooterFilter] = useState<Filter>(FILTERS.ALL);

  const completedCount = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    switch (footerFilter) {
      case FILTERS.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FILTERS.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [footerFilter, todos]);

  const handleErrorMessage = (error: string) => {
    setErrorMessage(error);
  };

  useEffect(() => {
    if (!getUserId()) {
      return;
    }

    setErrorMessage('');
    setLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setLoadingTodos(false));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleTodoAdded = (todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  };

  if (!getUserId()) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>

      <div className="todoapp__content">
        <TodoInput
          totalTodos={todos.length}
          completedCount={completedCount}
          handleErrorMessage={handleErrorMessage}
          loadingTodos={loadingTodos}
          setLoadingTodos={setLoadingTodos}
          handleTodoAdded={handleTodoAdded}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              setTodos={setTodos}
              loadingTodos={loadingTodos}
              setLoadingTodos={setLoadingTodos}
              handleErrorMessage={handleErrorMessage}
            />

            <TodoFooter
              todos={todos}
              footerFilter={footerFilter}
              setFooterFilter={setFooterFilter}
            />
          </>
        )}
      </div>

      <TodoErrors
        errorMessage={errorMessage}
        handleErrorMessage={handleErrorMessage}
      />
    </div>
  );
};
