/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { Filter } from './components/Filter';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 10314;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [errorNotification, setErrorNotification] = useState('');

  let filteredTodos: Todo[] = [];

  useEffect(() => {
    setErrorNotification('');

    getTodos(USER_ID)
      .then(todosFromServer => {
        if (todosFromServer) {
          setTodos(todosFromServer);
        }
      })
      .catch(() => setErrorNotification('Error on loading'));
  }, [filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  switch (filterType) {
    case FilterType.All:
      filteredTodos = todos;
      break;

    case FilterType.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case FilterType.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default: throw new Error('Wrong filter type!');
  }

  const activeTodosCount = todos.length
    ? todos.filter(todo => todo.completed).length
    : [];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              <TodoList todos={filteredTodos} />
            </section>

            <footer className="todoapp__footer">
              {activeTodosCount && (
                <span className="todo-count">
                  {`${activeTodosCount} items left`}
                </span>
              )}

              <Filter
                currentFilterType={filterType}
                setFilterType={setFilterType}
              />

              {activeTodosCount === filterType.length && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}

            </footer>
          </>
        )}

      </div>

      {errorNotification && (
        <ErrorNotification errorNotification={errorNotification} />
      )}

    </div>
  );
};
