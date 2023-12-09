/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';

import { DispatchContext, StateContext } from './Store';

import { getTodos } from './api/todos';
import { filterTodos } from './services/filterTodos';

import { USER_ID } from './lib/user';

import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

import { Todo } from './types/Todo';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filter } = useContext(StateContext);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (error: Error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        dispatch({
          type: 'setTodos',
          payload: todosFromServer,
        });
        setFilteredTodos(todosFromServer);
      })
      .catch(() => handleError(Error.LoadTodosError));
  }, [dispatch]);

  useEffect(() => {
    setFilteredTodos(() => filterTodos(todos, filter));
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <TodoFooter />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
