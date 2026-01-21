import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { FilterParams } from './types/filterParams';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  // const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>('');
  const [filter, setFilter] = React.useState<FilterParams>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setError('');
    // setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
    // .finally(() => {
    //   setLoading(false);
    // })
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodo = todos.every(todo => todo.completed);
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodo={activeTodo} />
        {todos.length > 0 && <TodoList todos={filteredTodos} />}

        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            hasCompletedTodos={hasCompletedTodos}
            activeTodosCount={activeTodosCount}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
