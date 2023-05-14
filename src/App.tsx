/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoList } from './components/TodoList/TodoList';
import { FilteredBy } from './types/FilteredBy';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { UserWarning } from './UserWarning';

const USER_ID = 10382;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filteredBy, setfilteredBy] = useState(FilteredBy.ALL);

  const activeTodosCount = todos
    .filter(todo => todo.completed === false).length;
  const completedTodosCount = todos.length - activeTodosCount;

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
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      });
  }, []);

  useEffect(() => setFilteredTodos(getFilteredTodos(filteredBy)), [filteredBy]);

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
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        {/* <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
      </div>
    </div>
  );
};
