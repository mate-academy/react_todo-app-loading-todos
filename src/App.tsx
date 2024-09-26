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
      .catch(() => {
        setErrorMessage(Errors.Load);
        setTimeout(() => setErrorMessage(null), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filterTodos = (todosToFilter: Todo[]) => {
    let filteredTodos: Todo[] = [];

    switch (selectedTasks) {
      case SelectedTasks.All:
        filteredTodos = todosToFilter;
        break;
      case SelectedTasks.Completed:
        filteredTodos = todosToFilter.filter(todo => todo.completed === true);
        break;
      case SelectedTasks.Active:
        filteredTodos = todosToFilter.filter(todo => todo.completed === false);
        break;
      default:
        filteredTodos = todosToFilter;
        break;
    }

    return filteredTodos;
  };

  const filteredTodos = filterTodos(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderInput />

        <TodoList todos={filteredTodos} />

        {!!todos?.length && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
          />
        )}
      </div>

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
        {errorMessage}
      </div>
    </div>
  );
};
