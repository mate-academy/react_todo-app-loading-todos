/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { USER_ID } from './utils/user';

import { Todo } from './types/Todo';

import { changeTodo, getTodos } from './api/todos';

import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoErrorMessage } from './components/TodoErrorMessage';
import { ErrorMessages } from './types/ErrorMessages';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage]
    = useState<ErrorMessages>(ErrorMessages.Default);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodoTitle, setLoadingTodoTitle] = useState('');

  const isAllCompleted = todos.every(({ completed }) => completed);

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
    if (isAllCompleted) {
      setTodos(prevState => {
        return prevState.map(todo => {
          const updatedTodo = {
            ...todo,
            completed: false,
          };

          changeTodo(todo.id, { completed: false });

          return updatedTodo;
        });
      });

      return;
    }

    setTodos(prevState => {
      return prevState.map(todo => {
        const updatedTodo = {
          ...todo,
          completed: true,
        };

        changeTodo(todo.id, { completed: true })
          .catch(() => setErrorMessage(ErrorMessages.CannotUpdate));

        return updatedTodo;
      });
    });
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
          <button
            onClick={changeAllTodosStatus}
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: isAllCompleted,
            })}
          />

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
              todos={todos}
              loadingTodoTitle={loadingTodoTitle}
              setErrorMessage={setErrorMessage}
              handleTodoDelete={handleTodosDelete}
              handleTodoUpdate={handleTodoUpdate}
            />

            <TodoFooter />
          </>
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoErrorMessage
        errorMessage={errorMessage}
        removeErrorMessage={() => {
          setErrorMessage(ErrorMessages.Default);
        }}
      />
    </div>
  );
};
