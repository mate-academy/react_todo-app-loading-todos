import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, uploadTodo } from './api/todos';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { ErrorType } from './types/Errors';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
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
  const [errorMessage, setErrorMessage] = useState<ErrorType | ''>('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorType.LOAD_TODOS));
  }, []);

  useEffect(() => {
    if (!errorMessage.length) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const filteredTodos = useMemo(() => {
    switch (selectedTodoStatus) {
      case TodoStatus.Active:
        return todos.filter(todo => !todo.completed);

      case TodoStatus.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [selectedTodoStatus, todos]);

  const closeErrorHandler = () => {
    setErrorMessage('');
  };

  const handleStatusChange = (status: TodoStatus) => {
    setSelectedTodoStatus(status);
  };

  const addTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setErrorMessage('');

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
      setErrorMessage('');
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
          { hidden: errorMessage.length === 0 },
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
