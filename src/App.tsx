/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, addNewTodo } from './api/todos';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/SortTypes';
import { ErrorType } from './types/Errors';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { SortButtons } from './components/SortButtons';
import classNames from 'classnames';

const emptyTodo: Omit<Todo, 'id'> = {
  completed: false,
  userId: USER_ID,
  title: '',
};

const TodoStatusRoutes: Record<TodoStatus, string> = {
  [TodoStatus.All]: '/',
  [TodoStatus.Active]: '/active',
  [TodoStatus.Completed]: '/completed',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>(emptyTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodoStatus, setSelectedTodoStatus] = useState<TodoStatus>(
    TodoStatus.All,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);
  const isDisabled = todos.filter(t => t.completed).length === 0;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorType.LOAD_TODOS));
  }, []);

  useEffect(() => {
    if (!errorMessage?.length) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  const filteredTodos = useMemo(() => {
    switch (selectedTodoStatus) {
      case TodoStatus.Active:
        return todos.filter(todo => todo.completed === false);

      case TodoStatus.Completed:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  }, [selectedTodoStatus, todos]);

  const closeErrorHandler = () => {
    setErrorMessage(null);
  };

  const handleStatusChange = (status: TodoStatus) => {
    setSelectedTodoStatus(status);
  };

  const addTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setErrorMessage(null);

      addNewTodo(newTodo)
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
      setErrorMessage(null);
      setNewTodo(current => ({
        ...current,
        title: e.target.value,
      }));
    },
    [],
  );

  const filteringTodosByActiveStatus = useMemo(
    () => [...todos].filter(todo => todo.completed === false).length,
    [todos],
  );

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

        <SortButtons
          todos={todos}
          selectedStatus={selectedTodoStatus}
          onStatusChange={handleStatusChange}
          filteringTodosByActiveStatus={filteringTodosByActiveStatus}
          TodoStatusRoutes={TodoStatusRoutes}
          isDisabled={isDisabled}
        />
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage?.length === 0 },
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
