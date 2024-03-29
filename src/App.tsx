/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';

import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getPreparedTodos } from './api/todos';

import { Status } from './types/enums';

import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import { ErrorNotification } from './components/ErrorNotification';

import {
  TodosContext,
  TodosControlContext,
} from './components/context/TodosContext';

export const App: React.FC = () => {
  const [status, setStatus] = useState(Status.All);
  const [isLoading] = useState(false);
  const [inputTodo, setInputTodo] = useState('');

  const todos = useContext(TodosContext);

  const { handleCheckAll, handleClearAll } = useContext(TodosControlContext);

  const visibleTodos = getPreparedTodos(todos, { status });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const allCompleted = todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={handleCheckAll}
          />
          <TodoForm inputTodo={inputTodo} setInputTodo={setInputTodo} />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading && <Loader />}
          {!isLoading && (
            <TodoList
              todos={visibleTodos}
              inputTodo={inputTodo}
              setInputTodo={setInputTodo}
            />
          )}

          <Loader />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.values(Status).map(statusValue => {
                return (
                  <a
                    key={statusValue}
                    href={`#/${statusValue === Status.All ? '' : statusValue}`}
                    className={cn('filter__link', {
                      selected: status === statusValue,
                    })}
                    data-cy={`FilterLink${statusValue}`}
                    onClick={() => setStatus(statusValue)}
                  >
                    {statusValue}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.some(todo => !todo.completed)}
              onClick={handleClearAll}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification />
    </div>
  );
};
