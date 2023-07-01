/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './components/Error/Error';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Todolist } from './components/Todolist/Todolist';

const USER_ID = 10890;

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('All');
  const [isAddError, setIsAddError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setVisibleTodos);
  }, []);

  const handleCloseError = () => {
    setIsAddError(false);
    setIsDeleteError(false);
    setIsUpdateError(false);
  };

  const filterTodos = useCallback((todoStatus: string) => {
    if (todoStatus === 'Completed') {
      return visibleTodos.filter(todo => todo.completed);
    }

    if (todoStatus === 'Active') {
      return visibleTodos.filter(todo => !todo.completed);
    }

    return visibleTodos;
  }, [status, visibleTodos]);

  const filteredTodos = filterTodos(status);

  const areCompleted = filteredTodos.filter(todo => todo.completed);
  const areActive = filteredTodos.filter(todo => !todo.completed);

  const handleClearCompleted = () => (
    filteredTodos.filter(todo => !todo.completed)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          areActive={areActive}
          handleSubmit={handleSubmit}
        />
        <Todolist
          filteredTodos={filteredTodos}
        />

        {filteredTodos && (
          <Footer
            visibleTodos={visibleTodos}
            status={status}
            setStatus={setStatus}
            areCompleted={areCompleted}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {(isAddError
      || isDeleteError
      || isUpdateError) && (
        <Error
          isAddError={isAddError}
          isDeleteError={isDeleteError}
          isUpdateError={isUpdateError}
          handleCloseError={handleCloseError}
        />
      )}
    </div>
  );
};
