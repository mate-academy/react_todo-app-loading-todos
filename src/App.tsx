/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, useEffect, useState } from 'react';

import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import * as todosService from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 85;

function getTodosFilterByStatus(todos: Todo[], sortField: string) {
  const copyTodos = [...todos];

  if (sortField === 'All') {
    return copyTodos;
  }

  if (sortField === 'Active') {
    return copyTodos.filter(todo => todo.completed === false);
  }

  if (sortField === 'Completed') {
    return copyTodos.filter(todo => todo.completed === true);
  }

  return copyTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTitle, setInputTitle] = useState('');

  const [errorState, setErrorState] = useState(false);

  const [sortField, setSortField] = useState('All');

  const filterTodos = getTodosFilterByStatus(todos, sortField);

  useEffect(() => {
    todosService.getTodos(USER_ID)
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })

      .catch(() => {
        setErrorState(true);
        setTimeout(() => {
          setErrorState(false);
        }, 3000);
      });
  }, []);

  const addTodo = ({
    title, completed, userId, id,
  }: Todo) => {
    todosService.createTodo({ title, completed, userId });

    setTodos(currentTodos => [
      ...currentTodos, {
        title, completed, userId, id,
      },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({
      title: inputTitle, completed: false, userId: USER_ID, id: +new Date(),
    });

    setInputTitle('');
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          handleSubmit={handleSubmit}
          title={inputTitle}
          setTitle={setInputTitle}
        />

        {todos.length > 0 && (
          <TodoList
            todos={filterTodos}
          />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setSortField={setSortField}
            sortField={sortField}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorState },
        )}
      >
        <button
          onClick={() => {
            setErrorState(false);
          }}
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        />
        {/* show only one message at a time */}
        Unable to load todos
      </div>
      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
    </div>
  );
};
