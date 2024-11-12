import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { FooterPart } from './components/Footer';
import { ErrorMessage } from './components/errorsMessage';
import { Status } from './components/status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>(Status.All);

  function deleteError() {
    setError('');
  }

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorMessage.loadError);
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const filterTodosByStatus = () => {
    switch (status) {
      case Status.Active:
        return todos.filter((todo: Todo) => !todo.completed);
      case Status.Completed:
        return todos.filter((todo: Todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = filterTodosByStatus();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header posts={todos} />
        <TodoList posts={filteredTodos} />
        {todos.length > 0 && (
          <FooterPart posts={todos} filterStatus={setStatus} status={status} />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          onClick={deleteError}
          type="button"
          className="delete"
        />
        {error}
      </div>
    </div>
  );
};
