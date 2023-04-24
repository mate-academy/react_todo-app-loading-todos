/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';

import { Todo as TodoType } from './types/Todo';
import { Todo } from './components/Todo';
import { Filter } from './components/Filter';
import { FilterParams } from './components/Filter/FilterParams';

const USER_ID = 9925;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filterParam, setFilterParam] = useState(FilterParams.all);
  const [error, setError] = useState(false);
  const [activeTodos, setActiveTodos] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => setTodos(result))
      .catch(() => {
        setError(true);

        setTimeout(() => setError(false), 2000);
      });
  }, []);

  useEffect(() => {
    const activeTodosCount = todos.filter(todo => !todo.completed).length;
    const completedTodosCount = todos.filter(todo => todo.completed).length;

    setActiveTodos(activeTodosCount);
    setCompletedTodos(completedTodosCount);
  }, [filterParam, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    const { completed } = todo;

    switch (true) {
      case filterParam === FilterParams.active:
        return !completed;

      case filterParam === FilterParams.completed:
        return completed;

      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!!visibleTodos.length && (
          <>
            <section className="todoapp__main">
              {visibleTodos.map(todo => (
                <Todo todoItem={todo} key={todo.id} />
              ))}
            </section>
          </>
        )}

        {!!todos.length && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos} items left`}
            </span>

            <Filter
              setFilterParamHandler={setFilterParam}
              filterParam={filterParam}
            />

            {!!completedTodos && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {error && (
        <div className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setError(false)}
          />

          Unable to add a todo
        </div>
      )}
    </div>
  );
};
