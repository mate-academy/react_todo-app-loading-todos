/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { UserWarning } from './components/UserWarning';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { ErrorNotifications } from './components/ErrorNotifications';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { filterTodos } from './utils/filterTodos';

const USER_ID = 6378;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showError, setShowError] = useState(false);
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
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
        <TodoForm />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFilter
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              completedTodos={completedTodos}
              activeTodos={activeTodos}
            />
          </>
        )}

      </div>

      <ErrorNotifications
        showError={showError}
        setError={setShowError}
      />
    </div>
  );
};
