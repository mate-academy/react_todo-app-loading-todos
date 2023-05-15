/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { FilteredBy } from './types/FilteredBy';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { UserWarning } from './UserWarning';

const USER_ID = 10348;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filteredBy, setfilteredBy] = useState(FilteredBy.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const getFilteredTodos = (filter: FilteredBy) => {
    switch (filter) {
      case FilteredBy.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilteredBy.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosFromServer: Todo[] = await getTodos(USER_ID);

        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(filteredBy));
  }, [filteredBy]);

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
            className={cn('todoapp__toggle-all', {
              active: activeTodosCount > 0,
            })}

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

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodosCount} items left`}
            </span>

            <TodoFilter
              filter={filteredBy}
              setFilter={setfilteredBy}
            />

            {completedTodosCount > 0 && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};
