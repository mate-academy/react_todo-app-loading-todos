/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useRef, useState } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, updateTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Head } from './components/headers/headers';
import { Main } from './components/Main/main';
import { Footer } from './components/footer/Footer';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterOption } from './types/FilterOption';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterOption.All);
  const [errorMessage, setErrorMessage] = useState('');

  const refFocusInputSearch = useRef<HTMLInputElement>(null);

  const allTodosCompleted = todosFromServer.every(todo => todo.completed);

  let visibilitedTodos: Todo[] = todosFromServer;

  // #region filterTodos

  if (filterStatus === FilterOption.Active) {
    visibilitedTodos = todosFromServer.filter(todo => !todo.completed);
  }

  if (filterStatus === FilterOption.Completed) {
    visibilitedTodos = todosFromServer.filter(todo => todo.completed);
  }

  // #endregion filterTodos

  // #region toggle all

  const handleArrowAddStatus = async () => {
    const updatedTodos = todosFromServer.map(todo => ({
      ...todo,
      completed: !allTodosCompleted,
    }));

    await Promise.all(updatedTodos.map(todo => updateTodo(todo, todo.id)));

    setTodosFromServer(updatedTodos);
  };

  // #endregion toggle all

  // #region checkbox

  const handleCheckBoxStatus = (id: number, status: boolean) => {
    const todo = todosFromServer.find(tod => tod.id === id);

    if (!todo) {
      return;
    }

    const updatedTodo: Todo = {
      ...todo,
      completed: !status,
    };

    updateTodo(updatedTodo, id).then(todoNew => {
      setTodosFromServer(current => {
        const updatedTodos = [...current];

        const index = current.findIndex(tod => tod.id === id);

        updatedTodos.splice(index, 1, todoNew);

        return updatedTodos;
      });
    });
  };

  // #endregion checkbox

  // #region get todos

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => {
        setErrorMessage(ErrorMessage.Load);
      })
      .finally(() => {
        window.setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  // #endregion get todos

  // #region focus

  useEffect(() => {
    refFocusInputSearch.current?.focus();
  }, []);

  // #endregion focus

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Head ref={refFocusInputSearch} arrow={handleArrowAddStatus} />

        <Main
          visibilitedTodos={visibilitedTodos}
          handleCheck={handleCheckBoxStatus}
        />

        <Footer
          todos={todosFromServer}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorMessage === '' ? 'hidden' : ''
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}
      </div>
    </div>
  );
};
