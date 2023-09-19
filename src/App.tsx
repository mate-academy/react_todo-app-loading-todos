/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { USER_ID } from './utils/user';

import { Todo } from './types/Todo';

import { getTodos } from './api/todos';

import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoErrorMessage } from './components/TodoErrorMessage';
import { ErrorMessages } from './types/ErrorMessages';
import { FilterParams } from './types/FilterParams';

const getFilteredTodos = (todos: Todo[], completionStatus: FilterParams) => {
  if (completionStatus === 'All') {
    return [...todos];
  }

  const isCompleted = completionStatus === FilterParams.Completed;

  return todos.filter(({ completed }) => completed === isCompleted);
};

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage]
    = useState<ErrorMessages>(ErrorMessages.Default);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodoTitle, setLoadingTodoTitle] = useState('');
  const [isAllCompleted, setIsAllCompleted]
    = useState<null | boolean>(null);
  const [filterParam, setFilterParam]
   = useState<FilterParams>(FilterParams.All);
  const [clearCompleted, setClearCompleted] = useState(false);

  const filteredTodos = getFilteredTodos(todos, filterParam);
  const currentCompletionStatus = todos.every(({ completed }) => completed);

  const handleTodosUpdate = (newTodo: Todo) => {
    setTodos(prevState => [...prevState, newTodo]);
  };

  const handleTodosDelete = (todoId: number) => {
    setTodos(prevState => prevState.filter(({ id }) => id !== todoId));
  };

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos(prevState => {
      const stateCopy = [...prevState];
      const updatedTodoIndex = stateCopy
        .findIndex(({ id }) => id === updatedTodo.id);

      stateCopy[updatedTodoIndex] = updatedTodo;

      return stateCopy;
    });
  };

  const changeAllTodosStatus = () => {
    if (isAllCompleted || currentCompletionStatus) {
      setIsAllCompleted(false);

      return;
    }

    setIsAllCompleted(true);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {Boolean(todos.length) && (
            <button
              onClick={changeAllTodosStatus}
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: currentCompletionStatus,
              })}
            />
          )}

          {/* Add a todo on form submit */}
          <TodoForm
            setErrorMessage={setErrorMessage}
            handleTodosUpdate={handleTodosUpdate}
            setLoadingTodoTitle={setLoadingTodoTitle}
          />
        </header>

        {Boolean(todos.length) && (
          <>
            <TodoList
              clearCompleted={clearCompleted}
              setClearCompleted={setClearCompleted}
              todos={filteredTodos}
              loadingTodoTitle={loadingTodoTitle}
              setErrorMessage={setErrorMessage}
              handleTodoDelete={handleTodosDelete}
              handleTodoUpdate={handleTodoUpdate}
              isAllCompleted={isAllCompleted}
              setIsAllCompleted={setIsAllCompleted}
            />

            <TodoFooter
              setClearCompleted={setClearCompleted}
              todos={todos}
              setFilterParam={setFilterParam}
              filterParam={filterParam}
            />
          </>
        )}

      </div>

      <TodoErrorMessage
        errorMessage={errorMessage}
        removeErrorMessage={() => {
          setErrorMessage(ErrorMessages.Default);
        }}
      />
    </div>
  );
};
