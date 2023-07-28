/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { TodoAppHeader } from './components/TodoAppHeader';
import { utils } from './utils/variables';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorTypes } from './types/ErrorTypes';

export const App: React.FC = () => {
  const { prepearedTodos, USER_ID } = utils;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('all');
  const todoList = prepearedTodos(todos, filterType);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorTypes.loadError);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (newTitle.trim().length === 0) {
      setErrorMessage(ErrorTypes.emptyError);

      return;
    }

    createTodo({ title: newTitle, completed: false, userId: USER_ID })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
        setNewTitle('');
      })
      .catch(() => {
        setErrorMessage(ErrorTypes.submitError);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader
          todos={todos}
          addTodo={addTodo}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
        />

        <TodoList todos={todoList} />

        {todos.length ? (
          <TodoFooter
            todos={todos}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        ) : null}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
