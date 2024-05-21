/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [emptyTitle, setEmptyTitle] = useState(false);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setFilteredTodos(data);
    });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const applyFilter = (filt: string, todosArr: Todo[]) => {
    switch (filt) {
      case Filter.Active:
        setFilteredTodos(todosArr.filter(todo => !todo.completed));
        break;
      case Filter.Completed:
        setFilteredTodos(todosArr.filter(todo => todo.completed));
        break;
      case Filter.All:
      default:
        setFilteredTodos(todosArr);
        break;
    }
  };

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    applyFilter(newFilter, todos);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
    applyFilter(filter, updatedTodos);
  };

  const handleShowError = () => {
    setEmptyTitle(true);

    setTimeout(() => {
      setEmptyTitle(false);
    }, 3000);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      const newTodo: Todo = {
        id: todos.length + 1,
        title: query,
        completed: false,
        userId: USER_ID,
      };

      const updatedTodos = [...todos, newTodo];

      setTodos(updatedTodos);
      setQuery('');
      applyFilter(filter, updatedTodos);
    } else {
      handleShowError();
    }
  };

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
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleQueryChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(({ id, title, completed }) => (
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed: completed,
              })}
              key={id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={completed}
                  onChange={() => handleToggleTodo(id)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => handleFilterChange(Filter.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => handleFilterChange(Filter.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilterChange(Filter.Completed)}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !emptyTitle },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setEmptyTitle(false)}
        />
        Title should not be empty
      </div>
    </div>
  );
};
