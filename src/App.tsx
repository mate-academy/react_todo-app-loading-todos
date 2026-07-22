import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorMessage } from './types/ErrorMessage';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.NONE,
  );
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setIsErrorVisible(false);
      setErrorMessage(ErrorMessage.NONE);

      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setErrorMessage(ErrorMessage.LOAD);
        setIsErrorVisible(true);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!isErrorVisible) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setIsErrorVisible(false);
    }, 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [errorMessage, isErrorVisible]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header areAllCompleted={areAllCompleted} />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            filter={filter}
            setFilter={setFilter}
            hasCompletedTodos={hasCompletedTodos}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        isErrorVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </div>
  );
};
