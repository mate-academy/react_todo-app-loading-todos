/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useCallback, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './types/FilterEnum';
import { ErrorMessage } from './components/ErrorMesage';

const USER_ID = 10336;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [isError, setIsError] = useState(false);

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  const closeError = useCallback(() => {
    setIsError(false);
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
      </div>

      {isError && (
        <ErrorMessage
          isError={isError}
          onClose={closeError}
        />
      )}
    </div>
  );
};
