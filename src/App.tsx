import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import cn from 'classnames';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { getTodoStats } from './utils/todoStats';
import { ErrorMessageType } from './constants/ErrorMessageType';
import { Header } from './components/Header';
import { FilterType } from './constants/FilterType';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

const ERROR_DISPLAY_TIMEOUT = 3000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessageType.None);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage(ErrorMessageType.Load);

        throw error;
      })
      .finally(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setErrorMessage(ErrorMessageType.None);
    }, ERROR_DISPLAY_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  const {
    allTodosCount: allCount,
    activeTodosCount: activeCount,
    completedTodosCount: completedCount,
    visibleTodos,
    completedTodos,
  } = getTodoStats(todos, filter);

  const addTodo = ({ title, userId, completed }: Omit<Todo, 'id'>) => {
    setLoading(true);

    todoService
      .addTodo({ title, userId, completed })
      .then(newTodo => {
        setTodos(current => [...current, newTodo]);
      })
      .catch(error => {
        setErrorMessage(ErrorMessageType.Add);
        throw new error();
      })
      .finally(() => {
        setLoading(false);

        setTimeout(() => inputRef.current?.focus(), 0);
      });
  };

  // const deleteTodo = (todoId: number) => {
  //   todoService
  //     .deleteTodo(todoId)
  //     .then(() =>
  //       setTodos(current => current.filter(todo => todo.id !== todoId)),
  //     )
  //     .catch(error => {
  //       setErrorMessage(ErrorMessage.Delete);
  //       throw error;
  //     });
  // };

  const clearCompletedTodos = () => {
    const deleteRequests = completedTodos.map(
      todo => todoService.deleteTodo(todo.id) as Promise<void>,
    );

    setLoading(true);

    Promise.allSettled(deleteRequests)
      .then(() => setTodos(current => current.filter(todo => !todo.completed)))
      .catch(error => {
        setErrorMessage(ErrorMessageType.Delete);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={cn('todoapp', { 'has-error': errorMessage })}>
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          onSubmit={addTodo}
          handleError={setErrorMessage}
          inputRef={inputRef}
          loading={loading}
        />

        <TodoList todos={visibleTodos} />

        {allCount > 0 && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filter={filter}
            onClearCompleted={clearCompletedTodos}
            onFilterChange={setFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={setErrorMessage}
      />
    </div>
  );
};
