/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

import { TodoStatusFilter } from './types/TodoStatusFilter';
import { getTodos, USER_ID } from './api/todos';
import { getFilteredTodos } from './utils/filterTodos';

import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(TodoStatusFilter.ALL);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  const filteredTodos = getFilteredTodos(todos, selectedFilter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleChangeStatus = (status: TodoStatusFilter) => {
    setSelectedFilter(status);
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          <TodoForm />
        </header>

        {filteredTodos.length !== 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </section>
        )}

        {todos.length !== 0 && (
          <TodoFooter
            todos={todos}
            selectedFilter={selectedFilter}
            onStatusChange={handleChangeStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onCloseErrorMessage={handleCloseErrorMessage}
      />
    </div>
  );
};
