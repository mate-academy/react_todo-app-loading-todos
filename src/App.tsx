import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { ErrorMessage } from './types/ErrorMessage';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessage.loadError);
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filterTodosByStatus = () => {
    switch (filterStatus) {
      case Status.Active:
        return setFilteredTodos(todos.filter((todo: Todo) => !todo.completed));
      case Status.Completed:
        return setFilteredTodos(todos.filter((todo: Todo) => todo.completed));
      default:
        return setFilteredTodos(todos);
    }
  };

  useEffect(() => {
    filterTodosByStatus();
  }, [todos, filterStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            todos={todos}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
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
