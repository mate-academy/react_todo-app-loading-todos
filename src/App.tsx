/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { getPreparedTodos } from './utils/GetPreparedTodos';
import { Filter } from './types/Filter';
import { TodoFooter } from './components/TodoFooter';
import { TodoNotification } from './components/TodoNotification';
import { ErrorsType } from './types/Error';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorsType | null>(null);
  const [filterBy, setFilterBy] = useState(Filter.All);

  const loadTodos = useCallback(async () => {
    try {
      const response = await getTodos();

      setTodos(response);
    } catch (error) {
      setErrorMessage(ErrorsType.LoadTodos);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleError = useCallback((error: ErrorsType | null) => {
    setErrorMessage(error);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const prepared = getPreparedTodos(todos, filterBy);
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const todosCount = todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader onError={setErrorMessage} todos={todos} />

        <TodoList preparedTodos={prepared} />

        {todosCount > 0 && (
          <TodoFooter
            filter={filterBy}
            setFilter={setFilterBy}
            activeTodos={activeTodos}
          />
        )}
      </div>

      <TodoNotification errorMessage={errorMessage} onSetError={handleError} />
    </div>
  );
};
