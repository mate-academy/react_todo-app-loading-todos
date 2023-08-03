/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 10344;

const filterActive = (
  data: Todo[],
) => data.filter((todo) => todo.completed === false);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);
  const [activeLength, setActiveLength] = useState(0);
  const [completedLength, setCompletedLength] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    getTodos(USER_ID)
      .then((todosFromApi) => {
        setTodos(todosFromApi);

        const activeTodos = filterActive(todosFromApi);

        setActiveLength(activeTodos.length);
        setCompletedLength(todosFromApi.length - activeTodos.length);

        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage(
          // eslint-disable-next-line max-len
          'Failed to fetch todos from the server. Please check your internet connection and try again later.',
        );
        timeoutId = setTimeout(() => setErrorMessage(''), 3000);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (filterType === FilterType.Active) {
      setFilteredTodos(filterActive(todos));
    } else if (filterType === FilterType.Completed) {
      setFilteredTodos(todos
        .filter((todo) => todo.completed));
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className={`todoapp__toggle-all ${activeLength > 0 ? 'active' : ''}`}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0
        && (
          <>
            <TodoList filteredTodos={filteredTodos} />

            <Footer
              filterType={filterType}
              setFilterType={setFilterType}
              itemsAmount={activeLength}
              completedLength={completedLength}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage
      && (
        <div
          className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
          {/* show only one message at a time */}
          {/* Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      )}
    </div>
  );
};
