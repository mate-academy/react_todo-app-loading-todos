import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { ErrorMessage } from './types/ErrorMessage';

const USER_ID = 11357;
const URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [title, setTitle] = useState('');

  const resetField = (): void => {
    setTitle('');
    setIsError(false);
    setError(null);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      resetField();
    }
  };

  useEffect(() => {
    client.get(URL).then(data => {
      const todosData = data as Todo[];

      setFilteredTodos(todosData);
      setTodos(todosData);
    })
      .catch(err => {
        setIsError(true);
        throw new Error('Oops, something went wrong: ', err);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!todos.find(todo => todo.completed === false) && (
            <button
              type="button"
              aria-label="button"
              className={
                cn(
                  'todoapp__toggle-all',
                  {
                    active: todos.length > 0,
                  },
                )
              }
            />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
              onKeyUp={handleKeyUp}
            />
          </form>
        </header>

        <section className="todoapp__main">
          <TodoList todos={filteredTodos} />
        </section>

        <footer className="todoapp__footer">
          <TodosFilter
            todos={filteredTodos}
            setTodos={setFilteredTodos}
            allTodos={todos}
          />
        </footer>
      </div>

      {isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            aria-label="button"
          />
          <br />
          {error}
          <br />
        </div>
      )}
    </div>

  );
};
