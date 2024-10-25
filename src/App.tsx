import React, { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { TodoItemList } from './components/TodoItemList/TodoItemList';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  const filterTodosByStatus = useCallback(() => {
    switch (filterStatus) {
      case Status.Active:
        return todos.filter((todo: Todo) => !todo.completed);
      case Status.Completed:
        return todos.filter((todo: Todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  const filteredTodos = filterTodosByStatus();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header />
      <TodoItemList todos={filteredTodos} />

      {!!todos.length && (
        <Footer
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          todos={todos}
        />
      )}
      <div
        data-cy="ErrorNotification"
        className={cn(
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
