/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoList } from './components/TodoList';
import { FilterBy } from './enums/FilterBy';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 10321;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const activeTodosNumber = todos
    .filter(todo => todo.completed === false).length;
  const completedTodosNumber = todos.length - activeTodosNumber;

  const getFilteredTodos = (filter: FilterBy) => {
    switch (filter) {
      case FilterBy.Active:
        return todos.filter(todo => !todo.completed);

      case FilterBy.Completed:
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

  useEffect(() => setFilteredTodos(getFilteredTodos(filterBy)), [filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: activeTodosNumber > 0,
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
              {`${activeTodosNumber} items left`}
            </span>

            <TodoFilter
              filter={filterBy}
              setFilter={setFilterBy}
            />

            {completedTodosNumber > 0 && (
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" /> */}

      {/* show only one message at a time */}
      {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
    </div>
  );
};
