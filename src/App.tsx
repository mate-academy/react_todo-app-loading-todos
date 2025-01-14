/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';
import { FilterMethods } from './types/Methods';
import { Error } from './components/Error';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState('');

  const [filterMethod, setFilterMethod] = useState<FilterMethods>('All');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(loadedTodos => {
        if (loadedTodos.length === 0) {
          setError('You don’t have todos at all!');
        } else {
          setTodos(loadedTodos);
        }

        setError(null);
      })
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const countOfItemsLeft = (elements: Todo[]) => {
    const filtered = elements.filter(el => el.completed === false);

    return filtered.length;
  };

  const clearCompleted = () => {
    setTodos(current => current.filter(el => el.completed === false));
  };

  function filterTodos(elements: Todo[], method: FilterMethods) {
    let copyForFilter = [...elements];

    if (method === 'All') {
      return todos;
    }

    if (method === 'Active') {
      copyForFilter = copyForFilter.filter(el => el.completed === false);
    }

    if (method === 'Completed') {
      copyForFilter = copyForFilter.filter(el => el.completed === true);
    }

    return copyForFilter;
  }

  const visibleTodos = filterTodos(todos, filterMethod);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {loading && (
        <div className="global-loader">
          <div className="loader"></div>
        </div>
      )}

      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onError={setError}
          formValue={formValue}
          onTodos={setTodos}
          changeFormValue={setFormValue}
        />

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            checkCount={countOfItemsLeft}
            setFilter={setFilterMethod}
            todos={todos}
            filterMethod={filterMethod}
            clear={clearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <Error error={error} />
    </div>
  );
};
