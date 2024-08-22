/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { FilterStatusType, Todo } from './types/Todo';
import * as tadoService from './api/todos';
import { Footer } from './component/Footer';
import { Error } from './component/Error';
import { UserWarning } from './UserWarning';
import { ListComponent } from './component/ListComponent';

function filterTodos(todos: Todo[], filter: FilterStatusType) {
  switch (filter) {
    case FilterStatusType.All:
      return todos;
    case FilterStatusType.Active:
      return todos.filter(todo => !todo.completed);
    case FilterStatusType.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterStatusType>(
    FilterStatusType.All,
  );

  // const [hiddenError, setHiddenError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    tadoService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        handleError('Failed to load todos');
      });
  }, []);

  if (!tadoService.USER_ID) {
    return <UserWarning />;
  }

  const tasks = filterTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <ListComponent todos={tasks} />
        {todos.length > 0 && (
          <Footer setFilterBy={setFilterBy} todos={todos} filterBy={filterBy} />
        )}
      </div>
      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
