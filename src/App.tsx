/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { TodoItem } from './components/TodoItem';
import { Error } from './components/Error';

const USER_ID = 11050;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const [isLoading] = useState(true);
  const [isEditing] = useState(false);

  const filteredTodos = useMemo(() => todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  }), [todos, filter]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => setError(null), 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const activeTodos = useMemo(() => (
    todos.filter((todo) => !todo.completed)
  ), [todos]);

  useEffect(() => {
    getTodos(USER_ID).then((response) => setTodos(response));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
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

        <section className="todoapp__main">
          {filteredTodos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={isEditing}
              isLoading={isLoading}
            />
          ))}
        </section>

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos.length}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {error && (
        <Error error={error} setError={setError} />
      )}
    </div>
  );
};
