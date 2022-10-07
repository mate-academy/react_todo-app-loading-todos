import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { NewTodo } from './components/NewTodo/NewTodo';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodosFilter } from './components/Footer/TodosFilter';
import { TodosList } from './components/TodosList/TodosList';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterStatus.All:
        return todo;
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return null;
    }
  });

  const loadTodos = async () => {
    try {
      setTodos(await getTodos(user?.id || 0));
    } catch {
      setIsError(true);
      setErrorMessage(ErrorMessage.LOADING);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          todos={todos}
          newTodoField={newTodoField}
          title={title}
          setTitle={setTitle}
        />

        <TodosList todos={filteredTodos} />

        <TodosFilter
          todos={todos}
          setFilterType={setFilterType}
          filterType={filterType}
        />
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  );
};
