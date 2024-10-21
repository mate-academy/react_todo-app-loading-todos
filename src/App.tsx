import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, uploadTodo } from './api/todos';
import { Todo, emptyTodo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { ErrorType } from './types/Errors';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { filterTodosByStatus } from './utils/helpers';
import { TodoStatusRoutes } from './constants/TodoRoutes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>(emptyTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodoStatus, setSelectedTodoStatus] = useState<TodoStatus>(
    TodoStatus.All,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.DEFAULT,
  );

  useEffect(() => {
    if (errorMessage.length) {
      const timeoutId = setTimeout(
        () => setErrorMessage(ErrorType.DEFAULT),
        3000,
      );

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [errorMessage]);

  const filteredTodos = useMemo(
    () => filterTodosByStatus(todos, selectedTodoStatus),
    [selectedTodoStatus, todos],
  );
  const closeErrorHandler = () => {
    setErrorMessage(ErrorType.DEFAULT);
  };

  const handleStatusChange = (status: TodoStatus) => {
    setSelectedTodoStatus(status);
  };

  const addTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setErrorMessage(ErrorType.DEFAULT);

      uploadTodo(newTodo)
        .then(todo => {
          setTodos(currentTodos => [...currentTodos, todo]);
          setNewTodo(emptyTodo);
        })
        .catch(() => {
          setErrorMessage(ErrorType.ADD_TODO);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [newTodo],
  );

  const changeTodoHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(ErrorType.DEFAULT);
      setNewTodo(current => ({
        ...current,
        title: e.target.value,
      }));
    },
    [],
  );

  const filteringTodosByActiveStatus = useMemo(
    () => [...todos].filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    if (!USER_ID) {
      return;
    }
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorType.LOAD_TODOS));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }


  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          addTodo={addTodo}
          newTodo={newTodo}
          onChange={changeTodoHandler}
        />
        <TodoList preparedTodos={filteredTodos} isLoading={isLoading} />

        <Footer
          todos={todos}
          selectedStatus={selectedTodoStatus}
          onStatusChange={handleStatusChange}
          filteringTodosByActiveStatus={filteringTodosByActiveStatus}
          TodoStatusRoutes={TodoStatusRoutes}
        />
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage.length },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorHandler}
        />
        {errorMessage}
      </div>
    </div>
  );
};
