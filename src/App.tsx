/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { NewTodo } from './components/NewTodo';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const USER_ID = 11549;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState(TodoStatus.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Unable to download todos');
        throw error;
      });
  }, []);

  const visibleTodos = todos.filter((todo) => {
    switch (filter) {
      case TodoStatus.All:
        return true;
      case TodoStatus.Active:
        return !todo.completed;
      case TodoStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const allTodoComplited = todos.length > 0
    && todos.every((todo) => todo.completed);

  const uncomplitedTodos = todos.filter((todo) => !todo.completed).length;

  const complitedTodos = todos.filter((todo) => todo.completed).length;

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const handleFilterChange = (newFilter: TodoStatus) => {
    setFilter(newFilter);
    clearErrorMessage();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                { active: allTodoComplited },
              )}
            />
          )}

          <NewTodo
            USER_ID={USER_ID}
            setTodos={setTodos}
            setErrorMessage={setErrorMessage}
          />
        </header>

        {todos.length !== 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${uncomplitedTodos} items left`}
              </span>

              <TodoFilter
                filter={filter}
                setFilter={handleFilterChange}
              />

              {complitedTodos !== 0 && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: errorMessage.length === 0 },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={clearErrorMessage}
        />
        {errorMessage}
      </div>
    </div>
  );
};
