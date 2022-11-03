/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorMessage';
import { getTodos } from './api/todos';

import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getTodoFromServer = async () => {
      try {
        const userId = user ? user.id : 0;
        const response = await getTodos(userId);

        setTodos(response);
        setVisibleTodos(response);
      } catch (error) {
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    };

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodoFromServer();
  }, []);

  useEffect(() => {
    const newVisibleTodos = todos.filter(todo => {
      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed;
        case FilterType.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });

    setVisibleTodos(newVisibleTodos);
  }, [filterType, todos]);

  const todosLeft = visibleTodos.reduce((num, todo) => {
    if (!todo.completed) {
      return num + 1;
    }

    return num;
  }, 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todosLeft={todosLeft}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {isError && (
        <ErrorNotification onClose={() => setIsError(false)} />
      )}
    </div>
  );
};
