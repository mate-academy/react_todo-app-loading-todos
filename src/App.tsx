import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessages } from './components/ErrorMessages';
import { TodoContent } from './components/TodoContent/TodoContent';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [filterStatus, setFilterStatus]
    = useState<FilterStatus>(FilterStatus.All);

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);

      setTimeout(() => setHasError(false), 3000);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  const filterTodos = useCallback((filterBy: FilterStatus) => {
    const filteredBuStatus = todos.filter(todo => {
      switch (filterBy) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    setVisibleTodos(filteredBuStatus);
    setFilterStatus(filterBy);
  }, [filterStatus]);

  const closeErrors = useCallback(() => {
    setHasError(false);
  }, [hasError]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent
        todos={todos}
        visibleTodos={visibleTodos}
        newTodoField={newTodoField}
        filterTodos={filterTodos}
        filterStatus={filterStatus}
      />

      <ErrorMessages
        hasError={hasError}
        closeErrors={closeErrors}
      />
    </div>
  );
};
