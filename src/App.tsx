import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import classNames from 'classnames';
import { USER_ID } from './api/todos';
import { SelectOption } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(SelectOption.All);
  const userId = USER_ID;

  function close() {
    setErrorMessage('');
  }

  function loadTodos() {
    setLoading(true);

    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (errorMessage) {
      setTimeout(close, 3000);
    }
  }, [errorMessage]);

  useEffect(loadTodos, [userId]);

  //const handleFilter = (currentFilter: string) => {
  //  setFilter(currentFilter);
  // };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case SelectOption.Active:
        return !todo.completed;
      case SelectOption.Completed:
        return todo.completed;
      case SelectOption.All:
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {todos.length !== 0 && (
          <Footer filter={filter} setFilter={setFilter} todos={todos} />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={close}
        />
        {errorMessage}
      </div>
    </div>
  );
};
