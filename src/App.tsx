/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Todos } from './api/components/todos';
import { Footer } from './api/components/footer';
import { Error } from './api/components/error';

const USER_ID = '12030';

function getPreparedTodos(todos: Todo[], filter: string): Todo[] {
  const preparedTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  return preparedTodos;
}

function error(er: string) {
  switch (er) {
    case 'load':
      return 'Unable to load todos';
    case 'empty':
      return 'Title should not be empty';
    case 'add':
      return 'Unable to add a todo';
    case 'delete':
      return 'Unable to delete a todo';
    case 'update':
      return 'Unable to update a todo';
    default: return '';
  }
}

function todosCounter(todos: Todo[]) {
  return todos.filter(todo => !todo.completed).length;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  function loadTodos() {
    setLoading(true);

    return client.get<Todo[]>(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('load');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function addTodos() {
    // setLoading(true);

    client.post<Todo>(USER_ID, {
      userId: USER_ID,
      title: newTodo,
      completed: false,
    })
      .then(nTodo => {
        setTodos((curTodos) => [...curTodos, nTodo]);
        setNewTodo('');
      })
      .catch(() => {
        setErrorMessage('add');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setLoading(false));
  }

  const handleSabmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodos();
  };

  const visibleTodos = getPreparedTodos(todos, filter);
  const onFilter = (f: string) => {
    setFilter(f);
  };

  const onCloseError = (e: string) => {
    setErrorMessage(e);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {!loading && (
        <>
          <div className="todoapp__content">
            <header className="todoapp__header">
              {/* this buttons is active only if there are some active todos */}
              <button
                type="button"
                className={visibleTodos.some(t => !t.completed)
                  ? 'todoapp__toggle-all active'
                  : 'todoapp__toggle-all'}
                data-cy="ToggleAllButton"
              />

              {/* Add a todo on form submit */}
              <form
                onSubmit={handleSabmit}
              >
                <input
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={newTodo}
                  onChange={(event) => setNewTodo(event.target.value)}
                />
              </form>
            </header>

            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <Todos todo={todo} />
              ))}
            </section>

            {/* Hide the footer if there are no todos */}
            {todos.length !== 0 && (
              <Footer
                filter={filter}
                onFilter={onFilter}
                count={todosCounter(todos)}
                showCCButton={!visibleTodos.some(todo => todo.completed)}
              />
            )}
          </div>

          <Error
            errorMessage={error(errorMessage)}
            onCloseError={onCloseError}
          />
        </>
      )}
    </div>
  );
};
