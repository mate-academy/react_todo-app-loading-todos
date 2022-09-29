/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './TodoList/Todolist';
import { Footer } from './Footer/Footer';
import { ErrorNotification } from './ErrorNotification/ErrorNotification';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setfilterType] = useState('all');
  const [error, setError] = useState(false);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      case FilterType.All:
        return todo;
      default:
        return 0;
    }
  });

  let userId = 0;

  if (user?.id) {
    userId = user.id;
  }

  userId = 10;

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(userId)
      .then(setTodos)
      .catch(() => (setError(true)));
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

        <TodoList
          todos={filteredTodos}
        />

        <Footer
          filterType={filterType}
          setfilterType={setfilterType}
          filteredTodos={filteredTodos}
        />
      </div>

      <ErrorNotification
        error={error}
        setError={setError}
      />
    </div>
  );
};
