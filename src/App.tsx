/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext, useEffect, useRef, useState,
} from 'react';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';

import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Filter } from './components/Filter/Filter';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterOptions>(FilterOptions.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodosFromServer = async (id: number) => {
      try {
        const todos = await getTodos(id);

        setTodosFromServer(todos);
      } catch (error) {
        setErrorMessage('Failed to load todos');
      }
    };

    if (user) {
      loadTodosFromServer(user.id);
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todosFromServer.length > 0 && (
          <>
            <TodoList
              todos={todosFromServer}
              currentFilter={filterBy}
            />
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${todosFromServer.length} items left`}
              </span>

              <Filter
                onFilterChange={setFilterBy}
                currentFilter={filterBy}
              />

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
      <ErrorNotification
        handleSkipErrorClick={setErrorMessage}
        message={errorMessage}
      />
    </div>
  );
};
