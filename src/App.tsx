import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

const USER_ID = 11357;
const URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    client.get(URL).then(data => {
      const todosData = data as Todo[];

      setFilteredTodos(todosData);
      setTodos(todosData);
    })
      .catch(error => {
        setIsError(true);
        throw new Error('Oops, something went wrong: ', error);
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

      <div className="notification is-danger is-light has-text-weight-normal">
        <button
          type="button"
          className="delete"
          aria-label="button"
        />

        {isError && (
          <>
            <>Unable to add a todo</>
            <br />
            <>Unable to delete a todo</>
            <>Unable to update a todo</>
            <br />
          </>
        )}
      </div>
    </div>
  );
};
