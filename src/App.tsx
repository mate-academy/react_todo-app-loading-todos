/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterTodos } from './types/FilterTodos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

// my ID = 11480

const USER_ID = 11480;

const filterTodos = (todos: Todo[], filterStatus: FilterTodos): Todo[] => {
  return todos.filter((todo: Todo) => {
    switch (filterStatus) {
      case FilterTodos.Completed:
        return todo.completed;
      case FilterTodos.Active:
        return !todo.completed;
      default:
        return 1;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFilterStatus, setTodosFilterStatus] = useState(FilterTodos.All);
  const [todosError, setTodosError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setTodosError('Unable to download todos');
        throw error;
      });

    const timeoutId = setTimeout(() => {
      setTodosError('');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const visibleTodos = filterTodos(todos, todosFilterStatus);

  const handleFilterStatus = (status: FilterTodos) => (
    setTodosFilterStatus(status));

  // const handleTodoCheck = (array: Todo[], todoId: number): Todo | undefined => {
  //   return array.find(({ id }) => id === todoId);
  // };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {visibleTodos.length !== 0 && (
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
        <TodoList todos={visibleTodos} />
        {Boolean(todos.length) && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${visibleTodos.length} items left`}
            </span>
            <TodoFilter
              handleFilterStatus={handleFilterStatus}
              todosFilterStatus={todosFilterStatus}
            />
            {/* Active filter should have a 'selected' class */}
            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        {
          hidden: !todosError,
        },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setTodosError('')}
        />
        {todosError}
      </div>
    </div>
  );
};
