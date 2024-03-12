/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

type FilterTypes = 'all' | 'active' | 'completed';

function prepareGoods(todos: Todo[], filteringType: FilterTypes): Todo[] {
  const allTodos = [...todos];

  switch (filteringType) {
    case 'all':
      return allTodos;
    case 'active':
      return allTodos.filter(todo => todo.completed === false);
    case 'completed':
      return allTodos.filter(todo => todo.completed === true);
    default:
      return allTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filteringType, setFilteringType] = useState<FilterTypes>('all');
  const [value, setValue] = useState<string>('');
  const [editing, setEditing] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const allCompleted = todos.map(todo => todo.completed === true);
  const unCompletedTodos = todos.filter(todo => todo.completed === false);

  function getAllTodos() {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(`Unable to load todos`));
  }

  useEffect(() => {
    if (USER_ID) {
      getAllTodos();
    }
  }, []);

  useEffect(() => {
    setFilteredTodos(prepareGoods(todos, filteringType));
  }, [todos, filteringType]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleAddingTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (!value) {
      setErrorMessage('Title should not be empty');
    }

    e.preventDefault();
    setValue('');
  };

  const handleEditTodo = (id: number) => {
    setEditing(id);
  };

  const handleSaveTodo = (id: number) => {
    setSaving(id);
  };

  const handleFiltering = (type: FilterTypes) => {
    setFilteringType(type);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              allCompleted: 'active',
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              value={value}
              onChange={handleAddingTodo}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {filteredTodos.map(todo => (
          <section className="todoapp__main" data-cy="TodoList">
            {!editing && !saving && (
              <div
                data-cy="Todo"
                className={classNames(
                  todo.completed ? 'todo completed' : 'todo',
                )}
                onDoubleClick={() => handleEditTodo(todo.id)}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>
              </div>
            )}

            {editing === todo.id && (
              <div data-cy="Todo" className="todo">
                <form onSubmit={() => handleSaveTodo(todo.id)}>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={todo.title}
                  />
                </form>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            )}

            {saving === todo.id && (
              <div data-cy="Todo" className="todo">
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title} is being saved now
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div
                  data-cy="TodoLoader"
                  className={classNames('modal overlay', {
                    'is-active': saving === todo.id,
                  })}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            )}
          </section>
        ))}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {unCompletedTodos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filteringType === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFiltering('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filteringType === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFiltering('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filteringType === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFiltering('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.length === unCompletedTodos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </div >
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
