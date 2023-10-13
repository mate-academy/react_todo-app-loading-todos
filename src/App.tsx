/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoStatus, Todo } from './types';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/Todolist';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { USER_ID, DOWNLOAD_ERROR } from './utils/constants';
import { countUncompletedTodos } from './utils/countUncompletedTodos';
import { Notification } from './components/Notification/Notification';

export const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [filterByStatus, setFilterByStatus] = useState(TodoStatus.All);
  const [errorMessage, setErrorMessage] = useState('');

  const visibleTodos = useMemo(() => getFilteredTodos(
    filterByStatus, todoItems,
  ), [filterByStatus, todoItems]);

  const uncompletedTodos = countUncompletedTodos(todoItems);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodoItems)
      .catch(() => {
        setErrorMessage(DOWNLOAD_ERROR);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              data-cy="NewTodoField"
            />
          </form>
        </header>

        {visibleTodos && (
          <TodoList
            todos={visibleTodos}
          />
        )}

        {!!todoItems.length && (
          <TodoFilter
            selectStatus={setFilterByStatus}
            status={filterByStatus}
            uncompletedTodos={uncompletedTodos}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
