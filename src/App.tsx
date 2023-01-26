import React, {
  useContext, useEffect, useState, useMemo, useCallback,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Filter } from './components/Filter';

import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(Filters.All);

  const showError = useCallback((message: string) => {
    setErrorMessage(message);

    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const hideError = useCallback(() => {
    setErrorMessage('');
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => showError('Cannot load todos'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (selectedStatus) {
        case Filters.Active:
          return !todo.completed;

        case Filters.Completed:
          return todo.completed;

        case Filters.All:
        default:
          return todo;
      }
    });
  }, [todos, selectedStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Filter
              activeTodos={activeTodos}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          hideMessage={hideError}
        />
      )}
    </div>
  );
};
