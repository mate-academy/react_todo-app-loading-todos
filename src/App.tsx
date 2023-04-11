/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { TodoFilter } from './components/ErrorMessage/TodoFilter/TodoFilter';
import { Header } from './components/Header/Header';
import { Loader } from './components/Loader/Loader';
import { TodoList } from './components/TodoList/TodoList';
import { SortTodoBy } from './types';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6997;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortTodosBy, setSortTodosBy] = useState(SortTodoBy.Default);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleShowError = (text: string) => {
    setLoadingError(true);
    setErrorText(text);
  };

  const loadTodos = (userId: number) => {
    setIsLoading(true);
    setLoadingError(false);

    getTodos(userId)
      .then(loadedTodos => setTodos(loadedTodos))
      .catch(() => handleShowError('Unable to load todos!'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTodos(USER_ID);
  }, []);

  const handleCloseError = () => {
    setLoadingError(false);
  };

  const visiableTodos = todos.filter(todo => {
    switch (sortTodosBy) {
      case SortTodoBy.Completed:
        return todo.completed;
      case SortTodoBy.Active:
        return !todo.completed;
      default:
        return todo;
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

        {isLoading && (
          <Loader />
        )}

        <TodoList todos={visiableTodos} />

        {/* Hide the footer if there are no todos */}
        {visiableTodos.length > 0 && (
          <TodoFilter
            changeSortBy={setSortTodosBy}
          />
        )}
      </div>

      {loadingError && (
        <ErrorMessage
          text={errorText}
          onClose={handleCloseError}
        />
      )}
    </div>
  );
};
