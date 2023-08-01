import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { prepareTodos } from './utils/filterTodos';
import { UserWarning } from './UserWarning';
import { TodoError } from './components/TodoError/TodoError';
import { Error } from './types/Error';

const USER_ID = 6909;

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState(Status.all);
  const [error, setError] = useState(Error.NONE);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Error.LOAD));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const notCompletedTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = prepareTodos(todos, sortField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {notCompletedTodos.length > 0
            && (
              <button
                type="button"
                className="todoapp__toggle-all active"
                aria-label="toggleButton"
              />
            )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </form>
        </header>

        {todos.length > 0
          && (
            <section className="todoapp__main">
              <TodoList filteredTodos={filteredTodos} />
            </section>
          )}

        {todos.length > 0 && (
          <Footer
            completedTodos={completedTodos}
            notCompletedTodos={notCompletedTodos}
            sortField={sortField}
            setSortField={setSortField}
          />
        )}
      </div>

      {error
        && (
          <TodoError
            error={error}
            setError={setError}
          />
        )}
    </div>
  );
};
