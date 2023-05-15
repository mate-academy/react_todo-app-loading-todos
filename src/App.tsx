/* eslint-disable jsx-a11y/control-has-associated-label */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoList } from './Components/TodoList/TodoList';
import { FilterBy } from './utils/FilterBy';
import { TodoFilter } from './Components/TodoFilter/TodoFilter';

const USER_ID = 10341;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const visibleTodos = useMemo(() => (
    todos.filter((todo) => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;

        case FilterBy.Completed:
          return todo.completed;

        default:
          return true;
      }
    })
  ), [todos, filterBy]);

  const getTodos = async () => {
    const todosFromServer = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

    setTodos(todosFromServer);
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;
  const isTodosNoEmpty = todos.length > 0;

  useEffect(() => {
    getTodos();
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterBy) => {
    setFilterBy(newFilter);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {isTodosNoEmpty && (
            <button
              type="button"
              className={classNames(
                'todoapp__toggle-all', {
                  active: todos.every((todo) => todo.completed),
                },
              )}
            />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {isTodosNoEmpty && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${itemsLeft} items left`}
            </span>

            <TodoFilter
              filterBy={filterBy}
              onFilterChange={handleFilterChange}
            />

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>

          </footer>
        )}
      </div>
    </div>
  );
};
