/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodosList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterStatus } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState(false);
  const [errorText] = useState('');

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(todosFromServer => {
          setTodos(todosFromServer);
        })
        .catch(() => setError(true));
    }

    setTimeout(() => setError(false), 3000);
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.All:
        return todo;

      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        throw new Error();
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

        {TodosList.length > 0 && (
          <>
            <TodosList todos={filteredTodos} />
            <Footer
              todos={todos}
              filterType={filterStatus}
              handleFilterStatus={setFilterStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        handleErrorChange={setError}
        errorText={errorText}
      />
    </div>
  );
};
