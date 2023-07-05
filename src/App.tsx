import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterBy } from './types/FilterBy';
import { ErrorText } from './types/ErrorText';
import { filterByStatus } from './utils/helpers';

const USER_ID = 10913;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorText | null>(null);
  const [todosFilter, setTodosFilter] = useState(FilterBy.All);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorText.onLoad);
      });
  }, []);

  if (errorMessage) {
    setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  }

  const activeTodos = filterByStatus(todos, false);
  const completedTodos = filterByStatus(todos, true);

  const visibleTodos = useMemo(() => {
    switch (todosFilter) {
      case FilterBy.All:
        return todos;

      case FilterBy.Completed:
        return completedTodos;

      case FilterBy.Active:
        return activeTodos;

      default:
        throw new Error('failed to filter');
    }
  }, [todosFilter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {visibleTodos.length > 0
          && (
            <>
              <TodoList todos={visibleTodos} />

              <Footer
                setTodosFilter={setTodosFilter}
                todosFilter={todosFilter}
                activeTodosNumber={activeTodos.length}
                completedTodosdNumber={completedTodos.length}
              />
            </>
          )}
      </div>
      {errorMessage
        && (
          <ErrorMessage
            errorMessage={errorMessage}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
          />
        )}
    </div>
  );
};
