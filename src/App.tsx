/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { Status, ErrorType } from './Enums/Enums';
import { Errors } from './components/Errors/Errors';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Status>(Status.ALL);
  const [error, setError] = useState<ErrorType>(ErrorType.None);

  useEffect(() => {
    const getTodosFromApi = async () => {
      if (user) {
        try {
          const response = await getTodos(user?.id);

          setTodos(response);
        } catch {
          throw new Error('Todos not found');
        }
      }
    };
    // focus the element with `ref={newTodoField}`

    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromApi();
  }, []);

  const hendlerError = (p: ErrorType) => {
    setError(p);

    setTimeout(() => {
      setError(ErrorType.None);
    }, 3000);
  };

  useEffect(() => {
    const newVisibleTodos = todos.filter(todoFilter => {
      switch (filterBy) {
        case Status.ACTIVE:
          return !todoFilter.completed;

        case Status.COMPLETED:
          return todoFilter.completed;

        default:
          return todoFilter;
      }
    });

    setVisibleTodos(newVisibleTodos);
  }, [filterBy, todos]);

  const hendlerInputError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setError(ErrorType.Add);

      setTimeout(() => {
        setError(ErrorType.None);
      }, 3000);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onKeyDown={(e) => {
                hendlerInputError(e);
              }}
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} setError={hendlerError} />
        {visibleTodos.length > 0
          && (
            <TodoFooter
              todos={todos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              setError={hendlerError}
            />
          )}
      </div>

      <Errors error={error} setError={hendlerError} />
    </div>
  );
};
