/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { MainFilter } from './types/MainFilter';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { Loader } from './components/Loader/Loader';

const USER_ID = 9975;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorOfLoading, setErrorOfLoading] = useState('');
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [filterOption, setFilterOption] = useState(MainFilter.All);
  const [numberOfActiveTodos, numberOfCompletedTodos] = useMemo(
    () => [
      todos.filter(({ completed }) => !completed).length,
      todos.filter(({ completed }) => completed).length,
    ],
    [todos],
  );

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setErrorOfLoading('Something was wrong, during the loading...');
    } finally {
      setIsTodosLoading(false);
    }
  };

  const getFilteredTodos = (filter: MainFilter, someTodos: Todo[]) => {
    switch (filter) {
      case MainFilter.Active:
        return someTodos.filter((todo) => !todo.completed);
      case MainFilter.Completed:
        return someTodos.filter((todo) => todo.completed);
      default:
        return someTodos;
    }
  };

  useEffect(() => {
    setErrorOfLoading('');
    getTodosFromServer();
    setTimeout(() => setErrorOfLoading(''), 3000);
  }, []);

  const visibleTodos = getFilteredTodos(filterOption, todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {isTodosLoading
            ? <Loader />
            : <TodoList todos={visibleTodos} />}
        </section>

        {todos && (
          <TodoFilter
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            numberOfActiveTodos={numberOfActiveTodos}
            numberOfCompletedTodos={numberOfCompletedTodos}
          />
        )}
      </div>
      <div
        className={classNames(
          'notification',
          'is-danger',
          'has-text-weight-normal',
          'is-light',
          {
            hidden: !errorOfLoading,
          },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorOfLoading('')}
        />
        {errorOfLoading}
      </div>
    </div>
  );
};
