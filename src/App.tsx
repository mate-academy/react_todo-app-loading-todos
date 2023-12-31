/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { client } from './utils/fetchClient';
import { Status } from './types/Status';
import { Form } from './Form';

const USER_ID = 12132;

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
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <Form addNewTodo={addNewTodo} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filtredTodo}
              togleCheck={togleCheck}
              toDelete={toDelete}
            />
            <Footer
              todos={todos}
              setFiltredByStatus={setFiltredByStatus}
              filtredByStatus={filtredByStatus}
            />
          </>
        )}
      </div>

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
        {errorNotification}
      </div>
    </div>
  );
};
