/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [filter, setFilter] = useState(FilterType.All);
  const visibleTodos = useMemo<Todo[]>(() => {
    if (todos) {
      return [...todos].filter(todo => {
        switch (filter) {
          case FilterType.Active:
            return !todo.completed;
          case FilterType.Completed:
            return todo.completed;
          case FilterType.All:
          default:
            return true;
        }
      });
    }

    return [];
  }, [todos, filter]);

  useEffect(() => {
    setErrorMessage('');
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(result => setTodos(result))
        .catch(() => {
          setErrorMessage('Cannot load todos');
        });
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => setErrorMessage(''), 3000);
  }, [errorMessage]);

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
            />
          </form>
        </header>

        {todos?.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              filterBy={(filterType: FilterType) => setFilter(filterType)}
              todosQuantity={todos.filter((todo) => !todo.completed).length}
              selectedFilter={filter}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          hideError={() => setErrorMessage('')}
        />
      )}
    </div>
  );
};
