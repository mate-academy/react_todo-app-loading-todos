import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessages } from './components/ErrorMessages';
import { TodoContent } from './components/TodoContent/TodoContent';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorType } from './types/ErrorType';

import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const manageErrors = (errorType: ErrorType) => {
    setErrorMessage(() => {
      switch (errorType) {
        case ErrorType.Endpoint:
          return 'Fetch error';

        case ErrorType.Title:
          return 'Title can`t be empty';

        case ErrorType.Add:
          return 'Unable to add a todo';

        case ErrorType.Delete:
          return 'Unable to delete a todo';

        case ErrorType.Update:
          return 'Unable to update a todo';

        case ErrorType.None:
        default:
          return '';
      }
    });
  };

  const countOfTodos = useMemo(() => todos.length, [todos]);

  const countOfLeftTodos = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const hasActiveTodo = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  const getTodosFromServer = useCallback(async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      manageErrors(ErrorType.Endpoint);

      setTimeout(() => manageErrors(ErrorType.None), 3000);
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [todos]);

  const filterTodos = (filterBy: FilterStatus) => {
    setFilterStatus(filterBy);

    return todos.filter(todo => {
      switch (filterBy) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  };

  const filteredTodos = useMemo(() => (
    filterTodos(filterStatus)
  ), [filterStatus, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent
        todos={todos}
        countOfTodos={countOfTodos}
        countOfLeftTodos={countOfLeftTodos}
        hasActiveTodo={hasActiveTodo}
        visibleTodos={filteredTodos}
        newTodoField={newTodoField}
        filterTodos={filterTodos}
        filterStatus={filterStatus}
      />

      <ErrorMessages
        errorMessage={errorMessage}
        manageErrors={manageErrors}
      />
    </div>
  );
};
