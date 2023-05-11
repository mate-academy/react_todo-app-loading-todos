/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useCallback, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './types/FilterEnum';

const USER_ID = 10336;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const loadTodos = useCallback(() => {
    getTodos(USER_ID).then((loadedTodos) => {
      setTodos(loadedTodos);
    });
  }, []);

  const filteredTodos = (currentTodos: Todo[], option: string) => {
    const visibleTodos = [...currentTodos];

    switch (option) {
      case Filter.ACTIVE:
        return visibleTodos.filter((todo) => !todo.completed);
      case Filter.COMPLETED:
        return visibleTodos.filter((todo) => todo.completed);
      default:
        return visibleTodos;
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = filteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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

        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter
              todoCounter={todos.length}
              filterTodos={filter}
              setFilterTodos={setFilter}
            />
          </>
        )}

        {/* Notification is shown in case of any error
          Add the 'hidden' class to hide the message smoothly
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={handleResetErrors}
          />

           show only one message at a time
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div> */}
      </div>
    </div>
  );
};
