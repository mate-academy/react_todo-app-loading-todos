/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { client } from './utils/fetchClient';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader';

const USER_ID = 11715;

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  function loadTodos() {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }

  useEffect(loadTodos, []);

  const filterTodos = (status: Status) => {
    switch (status) {
      case Status.Completed:
        return todos.filter(el => el.completed);
      case Status.Active:
        return todos.filter(el => !el.completed);
      case Status.All:
      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, todos]);

  const closeError = () => {
    setErrorMessage('');
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const markOneComplete = (id: number) => {
    setTodos(todos.map(
      (todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const updateTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(el => el.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(el => !el.completed));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
          userId={USER_ID}
          addTodo={addTodo}
        />

        {!!todos.length && (
          <>
            <TodoList
              todos={filteredTodos}
              markOneComplete={markOneComplete}
              updateTodo={updateTodo}
              removeTodo={removeTodo}
            />
            <TodoFooter
              todos={todos}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />
          </>
        )}
      </div>

      {/* Title should not be empty */}
      {/* <br /> */}
      {/* Unable to add a todo */}
      {/* <br /> */}
      {/* Unable to delete a todo */}
      {/* <br /> */}
      {/* Unable to update a todo */}

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage.length },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeError}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
