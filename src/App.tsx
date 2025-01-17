/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { FilterEnum, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotifications } from './components/ErrorNotifications';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);

  const [, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [inputText, setInputText] = useState('');

  const [selectedFilter, setSelectedFilter] = useState(FilterEnum.ALL);

  const [completedLentgh, setCompletedLentgh] = useState(0);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        setAllTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        setCompletedLentgh(
          todosFromServer.filter(todo => !todo.completed).length,
        );
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          visibleTodos={visibleTodos}
          inputText={inputText}
          error={error}
          setInputText={setInputText}
          setError={setError}
          setErrorMessage={setErrorMessage}
          setVisibleTodos={setVisibleTodos}
        />
        <TodoList visibleTodos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {allTodos.length > 0 && (
          <Footer
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setVisibleTodos={setVisibleTodos}
            completedLentgh={completedLentgh}
            allTodos={allTodos}
          />
        )}
      </div>

      <ErrorNotifications
        error={error}
        errorMessage={errorMessage}
        setError={setError}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
