/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

const USER_ID = 11498;
const URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);

  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    client.get(URL).then(data => {
      const todosData = data as Todo[];

      setTodos(todosData);
      setAllTodos(todosData);
    })
      .catch(error => {
        setIsError(true);
        throw new Error('An error occurred:', error);
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

          <TodoList todos={todos} />

        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <TodosFilter
            todos={todos}
            setTodos={setTodos}
            allTodos={allTodos}
          />
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        {isError
          && (
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
