/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Error } from './components/Error';

const USER_ID = 10344;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case Filter.ACTIVE:
          return !todo.completed;
        case Filter.COMPLETED:
          return todo.completed;
        case Filter.ALL:
        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  const loadTodos = async () => {
    setIsError(false);
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  const activeTodos = useMemo(
    () => todos.reduce((num, todo) => {
      return todo.completed ? num : num + 1;
    }, 0),
    [todos],
  );

  const completedTodos = visibleTodos.length - activeTodos;

  const hideErrorMessage = useCallback(() => {
    setIsError(false);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />

          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {visibleTodos && (
          <TodoList todos={visibleTodos} />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeTodos={activeTodos}
            filter={filterBy}
            completedTodos={completedTodos}
            setFilter={setFilterBy}
          />
        )}

      </div>

      {isError && (
        <Error
          isError={isError}
          onHide={hideErrorMessage}
        />
      )}

    </div>
  );
};
