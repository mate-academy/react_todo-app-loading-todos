import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
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

  const [filterStatus, setFilterStatus]
    = useState<FilterStatus>(FilterStatus.All);

  const manageErrors = (errorType: ErrorType) => {
    setErrorMessage(currentMessage => {
      let newMessage = currentMessage;

      switch (errorType) {
        case ErrorType.Endpoint:
          newMessage = 'Fetch error';
          break;

        case ErrorType.Title:
          newMessage = 'Title can`t be empty';
          break;

        case ErrorType.Add:
          newMessage = 'Unable to add a todo';
          break;

        case ErrorType.Delete:
          newMessage = 'Unable to delete a todo';
          break;

        case ErrorType.Update:
          newMessage = 'Unable to update a todo';
          break;

        case ErrorType.None:
        default:
          newMessage = '';
      }

      return newMessage;
    });
  };

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (error) {
      manageErrors(ErrorType.Endpoint);

      setTimeout(() => manageErrors(ErrorType.None), 3000);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  const filterTodos = (filterBy: FilterStatus) => {
    const filteredByStatus = todos.filter(todo => {
      switch (filterBy) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

    setFilterStatus(filterBy);

    return filteredByStatus;
  };

  const filteredTodos = useMemo(() => (
    filterTodos(filterStatus)
  ), [filterStatus, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent
        todos={todos}
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
