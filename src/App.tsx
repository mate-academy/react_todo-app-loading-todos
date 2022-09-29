/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';


function preperTodos(todos:Todo[], sortFilter:string, user: User) {
  return todos.filter(todo => todo.userId === user.id)
    .filter(todo => {
      switch (sortFilter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortFilter, setSortFilter] = useState('all');
  const [visibelTodos, setVisibelTodos] = useState<Todo[]>([...todos]);
  const [text, setTitle] = useState('');

  const deleteCompletedTodos = () => (
    setTodos(state => (
      state.filter(todo => todo.completed) || []))
  );

  // eslint-disable-next-line no-console
  console.log(user);
  // eslint-disable-next-line no-console
  console.log(visibelTodos);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(response => {
          setTodos(response);
        });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const idTodo = (todos.length > 0)
      ? (todos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1)
      : 1;

    if (newTodoField !== null && user !== null) {
      const newTodo:Todo = {
        id: idTodo,
        userId: user.id,
        title: text,
        completed: false,
      };

      todos.push(newTodo);
      setTitle('');
      // eslint-disable-next-line no-console
      console.log(todos);
    }
  };

  useMemo(() => {
    if (user !== null) {
      setVisibelTodos(() => (
        preperTodos(todos, sortFilter, user)
      ));
    }
  }, [todos, user, sortFilter]);

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

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={text}
              onChange={() => setTitle(newTodoField.current?.value || '')}
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
                      // value={todo.completed}
                      className="todo__status"
                      onClick={() => !todo.completed}
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
                  className="filter__link selected"
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
                  className="filter__link"
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
                  className="filter__link"
                  onClick={() => (
                    sortFilter !== 'completed'
                      && setSortFilter('comleted')
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

      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
