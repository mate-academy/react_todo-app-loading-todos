/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Error } from './components/Error';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';


export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortFilter, setSortFilter] = useState('all');
  const [visibelTodos, setVisibelTodos] = useState<Todo[]>([...todos]);

  const [isError, setError] = useState(false);
  const [messageError, setMessageError] = useState('');


  const deleteCompletedTodos = () => (
    setTodos(state => (
      state.filter(todo => !todo.completed) || []))
  );

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(response => {
          setTodos(response);
        })
        .catch(() => {
          setError(true);
          setMessageError('Todos from server were not gotten');
        });
    }
  }, []);

  useMemo(() => {
    setVisibelTodos(() => (
      todos.filter(todo => {
        switch (sortFilter) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return true;
        }
      })));
  }, [todos, sortFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos.length > 0
        && (
          <>
            <section
              className="todoapp__main"
              data-cy="TodoList"
            >
              {visibelTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
                  className={classNames(
                    'todo',
                    { completed: todo.completed },
                  )}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      defaultChecked
                    />
                  </label>

                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                  >
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDeleteButton"
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="
                      modal-background
                      has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}

            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${todos.length} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={classNames(
                    'filter__link',
                    { selected: sortFilter === 'all' },
                  )}
                  onClick={() => (
                    sortFilter !== 'all'
                      && setSortFilter('all')
                  )}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={classNames(
                    'filter__link',
                    { selected: sortFilter === 'active' },
                  )}
                  onClick={() => (
                    sortFilter !== 'active'
                      && setSortFilter('active')
                  )}
                >
                  Active
                </a>
                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={classNames(
                    'filter__link',
                    { selected: sortFilter === 'completed' },
                  )}
                  onClick={() => (
                    sortFilter !== 'completed'
                      && setSortFilter('completed')
                  )}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
                onClick={deleteCompletedTodos}
              >
                Clear completed
              </button>
            </footer>
          </>

        )}

      </div>

      <Error
        isError={isError}
        setError={setError}
        messageError={messageError}
      />
    </div>
  );
};
