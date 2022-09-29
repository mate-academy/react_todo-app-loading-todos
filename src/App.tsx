/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Filter } from './types/Filter';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(false);
  const [errorMessage] = useState('');

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  let userId = 0;

  if (user?.id) {
    userId = user.id;
  }

  userId = 1;

  getTodos(userId)
    .then(setTodos)
    .catch(() => setError(false));

  const visibleTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.All:
        return todo;

      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return 0;
    }
  });

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

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
        <TodoList todos={visibleTodos} />
        <Footer
          filter={filter}
          changeFilter={setFilter}
          todos={todos}
        />
      </div>
      <ErrorMessage
        error={error}
        handleError={setError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
