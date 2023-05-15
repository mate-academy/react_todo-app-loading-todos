/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterBy } from './enums/FilterBy';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api/todos';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

const USER_ID = 10321;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [errorMessage, setErrorMessage] = useState('');

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

  const deleteErrorMessage = () => setErrorMessage('');

  const loadData = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
      setFilteredTodos(todosFromServer);
    } catch {
      setErrorMessage('Failed to load data');
    }
  };

  useEffect(() => {
    loadData();
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

        {todos && (
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

      <ErrorMessage message={errorMessage} onDelete={deleteErrorMessage} />
    </div>
  );
};
