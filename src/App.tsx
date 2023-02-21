/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { filterTodos } from './utils/filterTodos';
import { Footer } from './components/Footer';
import { FilterBy } from './types/FilterBy';

const USER_ID = 6408;

export const App: React.FC = () => {
  // const [query, setQuery] = useState('');
  // const [todo, setTodo] = useState<Todo>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.all);
  const [isError, setIsError] = useState(false);
  const [typeError, setTypeError] = useState('');

  const pushError = (message: string) => {
    setIsError(true);
    setTypeError(message);
    window.setTimeout(() => {
      setIsError(false);
    }, 3000);

    // window.clearTimeout(timerId);
  };

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(6408);

      setTodos(todosFromServer);
    } catch {
      pushError('upload');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleData = filterTodos(todos, filterBy);

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
        <TodoList todos={visibleData} />
        {/* Hide the footer if there are no todos */}
        <Footer
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        setIsError={setIsError}
        typeError={typeError}
        isError={isError}
      />
    </div>
  );
};
