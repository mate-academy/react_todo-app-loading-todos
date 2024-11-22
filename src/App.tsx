/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

enum Filter {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>(Filter.all);
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.all:
          return todo;
        case Filter.active:
          return !todo.completed;
        case Filter.completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [filter, todos]);

  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      getTodos()
        .then(_todos => setTodos(_todos))
        .catch(() => {
          setError('Unable to load todos');

          setTimeout(() => setError(''), 3000);
        });
    }, 100);
  }, []);

  const nrOfActiveTodos = todos.filter(t => !t.completed).length;

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (value.length === 0) {
      setError('Title should not be empty');
    }

    setTimeout(() => setError(''), 3000);
  }

  function allSelected(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setFilter(Filter.all);
  }

  function activeSelected(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setFilter(Filter.active);
  }

  function completedSelected(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setFilter(Filter.completed);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onSubmit={onSubmit} value={value} setValue={setValue} />
        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            nrOfActiveTodos={nrOfActiveTodos}
            filter={filter}
            allSelected={allSelected}
            activeSelected={activeSelected}
            completedSelected={completedSelected}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} />
    </div>
  );
};
