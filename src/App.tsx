/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filters } from './types/enumFilter';
import { Filter } from './components/Filter/Filter';
// eslint-disable-next-line
import { ErrorNotification } from './components/Notification/ErrorNotification';
import { prepareTodos } from './utils/prepareTodos';

const USER_ID = 11241;

export const App: React.FC = () => {
  const [todos, seTodos] = useState<Todo[]>([]);
  const [filteringField, setFilteringField] = useState(Filters.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(seTodos)
      .catch(() => {
        setErrorMessage('Unable to load a todo');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todoCount = (currentTodos: Todo[]) => {
    return currentTodos.filter(todo => !todo.completed).length;
  };

  const visibletodos = prepareTodos(todos, filteringField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {
            todos.some(todo => !todo.completed)
            && (
              <button type="button" className="todoapp__toggle-all active" />
            )
          }

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length !== 0 && <TodoList todos={visibletodos} />}

        {todos.length !== 0
          && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todoCount(todos)} items left`}
              </span>

              <Filter
                filteringField={filteringField}
                setFilteringField={setFilteringField}
              />

              {todos.some(todo => todo.completed)
                && (
                  <button type="button" className="todoapp__clear-completed">
                    Clear completed
                  </button>
                )}
            </footer>
          )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
