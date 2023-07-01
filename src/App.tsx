/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { ErrorType, FilterType } from './types/HelperTypes';
import { ErrorMessage } from './components/ErrorMessage';
import { getFilteredTodos, getTodosInfo } from './Helper';
import { Footer } from './components/Footer';
import { UserWarning } from './UserWarning';

const USER_ID = 10884;

// I did this just in case https://mate-academy.github.io/react_todo-app-with-api/ doesn't respond.
const fakeTodos: Todo[] = [
  {
    id: 1, userId: 1, title: '1', completed: false,
  },
  {
    id: 2, userId: 1, title: '1', completed: true,
  },
  {
    id: 3, userId: 1, title: '1', completed: false,
  },
  {
    id: 4, userId: 1, title: '1', completed: true,
  },
];

interface TodosInfo {
  length: number,
  countOfActive: number,
  someCompleted: boolean,
}

const initialTodosInfo: TodosInfo = {
  length: 0,
  countOfActive: 0,
  someCompleted: false,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [todosInfo, setTodosInfo] = useState<TodosInfo>(initialTodosInfo);

  const loadTodos = async () => {
    setErrorType(null);

    try {
      const loadedTodos: Todo[] = await getTodos(USER_ID);

      setTodosInfo(getTodosInfo(loadedTodos));

      setTodos(loadedTodos);
    } catch {
      // use fake todo
      setTodos(fakeTodos);
      setTodosInfo(getTodosInfo(fakeTodos));

      setErrorType(ErrorType.DATALOADING);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos: Todo[] = useMemo(() => {
    const filteredTodos = getFilteredTodos(todos, filterType);

    return filteredTodos;
  }, [todos, filterType]);

  const handleFilterType = (type: FilterType): void => {
    setFilterType(type as FilterType);
  };

  const removeError = () => {
    setErrorType(null);
  };

  const errorMessage = useMemo(() => {
    const timerId = setTimeout(() => {
      setErrorType(null);
      clearTimeout(timerId);
    }, 3000);

    switch (errorType) {
      case ErrorType.DATALOADING:
        return 'Error loading data';
      default:
        return null;
    }
  }, [errorType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header countOfActive={todosInfo.countOfActive} />

        {todosInfo.length !== 0 && <TodoList todos={visibleTodos} />}

        {todosInfo.length !== 0 && (
          <Footer
            filterType={filterType}
            handleFilterType={handleFilterType}
            someCompleted={todosInfo.someCompleted}
            countOfActive={todosInfo.countOfActive}
          />
        )}
      </div>

      {errorMessage
        && (
          <ErrorMessage
            errorMessage={errorMessage}
            removeError={removeError}
          />
        )}
    </div>
  );
};
