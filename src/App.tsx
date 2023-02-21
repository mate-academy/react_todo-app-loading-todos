/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Errors } from './components/Errors/Errors';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { filterTodos } from './utils/prepareTodos';
import { Error } from './types/Error'

const USER_ID = 6405;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showError, setShowError] = useState(false);
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);
  const [errorType, setErrorType] = useState(Error.None);

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setErrorType(Error.Download);
      setShowError(true);
      window.setTimeout(() => setShowError(false), 3000);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const visibleTodos = filterTodos(todos, filterType);

  const completedTodos = todos
    .filter(todo => todo.completed).length;

  const activeTodos = todos.length - completedTodos;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              completedTodos={completedTodos}
              activeTodos={activeTodos}
            />
          </>
        )}
      </div>

      <Errors
        errorMessage={errorType}
        showError={showError}
        setError={setShowError}
      />
    </div>
  );
};
