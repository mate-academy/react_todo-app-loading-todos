/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, patchTodo } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Filter } from './types/enum';
import { TodoContext } from './TodoContext';
import { State, Todo } from './types/interfaces';

const USER_ID = 82;

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    todos: [],
    filter: Filter.All,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hideErrorTimeout = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(hideErrorTimeout);
    };
  }, [error]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((todos) => {
        setState((prev) => ({
          ...prev,
          todos,
        }));
      })
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function handleCheck(todo: Todo) {
    const checkTodo = { ...todo };

    checkTodo.completed = !todo.completed;

    function replaceTodo(prevState: State, patchedTodo: Todo) {
      prevState.todos.splice(prevState.todos.indexOf(todo), 1, patchedTodo);

      return prevState.todos;
    }

    patchTodo(checkTodo).then(patchedTodo => {
      setState(prev => ({
        ...prev,
        todos: replaceTodo(prev, patchedTodo),
      }));
    })
      .catch(() => {
        setError('Unable to update a todo');
      });
  }

  const contextValue = {
    state,
    setState,
    handleCheck,
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoContext.Provider value={contextValue}>
          {state.todos.length > 0
          && (
            <>
              <TodoList />
              <TodoFooter />
            </>
          )}

        </TodoContext.Provider>
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {error}
      </div>
    </div>
  );
};
