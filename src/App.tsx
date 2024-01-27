/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { TodosList } from './components/TodosList';
import { TodoError } from './types/enums/TodoError';
import { TodoFilter } from './types/enums/TodosFilter';

const USER_ID = '41';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFilter, setCurrentFilter]
    = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    client
      .get(`/todos?userId=${USER_ID}`)
      .then((todosFromServer) => {
        setTodos(todosFromServer as Todo[]);
      })
      .catch(() => {
        setIsErrorVisible(true);
        setErrorMessage(TodoError.UnableToLoad);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case TodoFilter.Active:
        return todos.filter(todo => !todo.completed);
      case TodoFilter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  const handleFilterChange = (filter: TodoFilter) => {
    setCurrentFilter(filter);
  };

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
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodosList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Footer
            todos={filteredTodos}
            currentFilter={currentFilter}
            filterChange={handleFilterChange}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        isErrorVisible={isErrorVisible}
        errorMessage={errorMessage}
        setIsErrorVisible={setIsErrorVisible}
      />
    </div>
  );
};
