/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { addTodo, deleteTodo, getTodos, patchTodo, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { CreateForm } from './components/CreateForm';
import classNames from 'classnames';
import { FilterStatus } from './types/FilterStatus';
import { ErrorMessage } from './types/ErrorMessage';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todosForView, setTodosForView] = useState<Todo[]>([]);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FilterStatus.all);

  const [errorMessage, setErrorMessage] = useState(ErrorMessage.notError);

  const setFilterValue = useCallback(setFilterBy, [filterBy]);
  const [hidenError, setHidenError] = useState(true);

  useEffect(() => {
    if (!errorMessage) {
      setTimeout(() => setHidenError(true), 3000);
    } else {
      setHidenError(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    //setLoading(true);
    getTodos(USER_ID)
      .then(response => {
        setTodosFromServer(response);
      })
      .catch(() => setErrorMessage(ErrorMessage.unableLoad));
    //.finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCompletedTodos(() => todosFromServer.filter(item => item.completed));
    setTodosForView(todosFromServer);
  }, [todosFromServer]);

  useEffect(() => {
    if (filterBy === FilterStatus.completed) {
      setTodosForView(completedTodos);

      return;
    }

    if (filterBy === FilterStatus.active) {
      setTodosForView(todosFromServer.filter(item => !item.completed));

      return;
    }

    setTodosForView(todosFromServer);
  }, [filterBy]);

  const onClearCompleted = () => {
    Promise.all([completedTodos.map(item => deleteTodo(item.id))]);
    setTodosFromServer(currentList =>
      currentList.filter(item => !item.completed),
    );
  };

  const resetAllTodosToActive = () => {
    setTodosFromServer(current =>
      current.map(item => {
        const newTodo = { ...item, completed: false };

        patchTodo(newTodo);

        return newTodo;
      }),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: completedTodos.length === todosFromServer.length,
            })}
            data-cy="ToggleAllButton"
            onClick={resetAllTodosToActive}
          />

          <CreateForm
            onAdd={addTodo}
            updateTodos={setTodosFromServer}
            setError={setErrorMessage}
          />
        </header>

        <TodoList
          todos={todosForView}
          updateTodos={setTodosFromServer}
          setError={setErrorMessage}
        />

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length !== 0 && (
          <Footer
            countActiveTodos={todosFromServer.length - completedTodos.length}
            countCompletedTodos={completedTodos.length}
            setFilterValue={setFilterValue}
            onClearCompleted={onClearCompleted}
            filterBy={filterBy}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        isHidenError={hidenError}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
