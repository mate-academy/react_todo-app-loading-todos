/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
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
      case 'active':
        setFilteredTodos(todosArr.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todosArr.filter(todo => todo.completed));
        break;
      case 'all':
      default:
        setFilteredTodos(todosArr);
        break;
    }
  };

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
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
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
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
          {/* This is a completed todo */}
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => handleFilterChange('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => handleFilterChange('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => handleFilterChange('completed')}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
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
// <div
// data-cy="ErrorNotification"
// className="notification is-danger is-light has-text-weight-normal"
// >
// <button data-cy="HideErrorButton" type="button" className="delete" />
// {/* show only one message at a time */}
// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
// </div>

// {/* This todo is in loadind state */}
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Todo is being saved now
//   </span>

//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   {/* 'is-active' class puts this modal on top of the todo */}
//   <div data-cy="TodoLoader" className="modal overlay is-active">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>

// {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   {/* This form is shown instead of the title and remove button */}
//   <form>
//     <input
//       data-cy="TodoTitleField"
//       type="text"
//       className="todo__title-field"
//       placeholder="Empty todo will be deleted"
//       value="Todo is being edited now"
//     />
//   </form>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>
