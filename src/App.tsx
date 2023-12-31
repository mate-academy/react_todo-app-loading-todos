/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Form } from './components/Form';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Status } from './types/Status';
import { client } from './utils/fetchClient';

const USER_ID = 11851;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredByStatus, setFiltredByStatus] = useState<Status>(Status.all);
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null,
  );
  const [errorVisible, setErrorVisible] = useState(false);

  const showErrorNotification = (message: string) => {
    setErrorNotification(message);
    setErrorVisible(true);

    setTimeout(() => {
      setErrorVisible(false);
      setErrorNotification(null);
    }, 3000);
  };

  useEffect(() => {
    client
      .get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        // Обработка ошибки при загрузке данных
        // console.error('Unable to load todos:', error);
        showErrorNotification('Unable to load todos');
      });
  }, []);

  const addNewTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const togleCheck = (id: number) => {
    const togledTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(togledTodos);
  };

  const toDelete = (id: number) => {
    const afterDeleteTodo = todos.filter((todo) => todo.id !== id);

    setTodos(afterDeleteTodo);
  };

  const filtredTodo = todos.filter((todo) => {
    switch (filtredByStatus) {
      case Status.active:
        return !todo.completed;
      case Status.completed:
        return todo.completed;
      default:
        return true;
    }
  });

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
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          {/* Add a todo on form submit */}
          <Form addNewTodo={addNewTodo} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filtredTodo}
              togleCheck={togleCheck}
              toDelete={toDelete}
            />
            {/* Hide the footer if there are no todos */}
            <Footer
              todos={todos}
              setFiltredByStatus={setFiltredByStatus}
              filtredByStatus={filtredByStatus}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorVisible ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorVisible(false)}
        />
        {/* show only one message at a time */}
        {errorNotification}
      </div>
    </div>
  );
};

// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
