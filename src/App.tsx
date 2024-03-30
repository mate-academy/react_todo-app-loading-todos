import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { HeaderInput } from './components/HeaderInput';
import { Footer } from './components/Footer';
import classNames from 'classnames';
import { Errors, SelectedTasks, Todo } from './types/Types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<SelectedTasks>(
    SelectedTasks.All,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage(Errors.Load);
        throw error;
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(null), 3000);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filterTodos = (todosToFilter: Todo[]) => {
    let filteredTodos: Todo[] = [];

    if (selectedTasks === SelectedTasks.All) {
      filteredTodos = todosToFilter;
    }

    if (selectedTasks === SelectedTasks.Completed) {
      filteredTodos = todosToFilter.filter(todo => todo.completed === true);
    }

    if (selectedTasks === SelectedTasks.Active) {
      filteredTodos = todosToFilter.filter(todo => todo.completed === false);
    }

    return filteredTodos;
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderInput />

        <TodoList todos={filterTodos(todos)} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
          />
        )}
      </div>

      {/* Show error notification only when errorMessage is not null */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {/* Show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
