import './styles/todoapp.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { USER_ID, getTodos } from './api/todos';
import { FilterType } from './types/FilterType';

import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodosList } from './components/TodosList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const beforeRequest = () => {
    setShowError(false);
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  useEffect(() => {
    if (USER_ID) {
      beforeRequest();
      getTodos()
        .then(todosFromServer => {
          setCurrentTodos(todosFromServer);
        })
        .catch(() => {
          handleError('Unable to load todos');
        });
    }
  }, []);

  const todoCounter = (todo: Todo[]) => {
    const todosLeft = todo.filter(item => !item.completed);
    const todoCompleted = todo.filter(item => item.completed);

    return {
      todosLeft: todosLeft.length,
      todoCompleted: todoCompleted.length,
    };
  };

  const filteredTodos = () => {
    switch (filter) {
      case FilterType.Active:
        return currentTodos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return currentTodos.filter(todo => todo.completed);
      case FilterType.All:
      default:
        return currentTodos;
    }
  };

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
            className={classNames('todoapp__toggle-all', {
              active:
                currentTodos.length > 0 &&
                currentTodos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {currentTodos.length > 0 && (
          <>
            <TodosList todos={filteredTodos()} />
            <Footer
              todoCount={todoCounter(currentTodos)}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !showError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setShowError(false)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
