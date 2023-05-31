/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Notification } from './components/Notification';
import { TodoField } from './components/TodoField';
import { Status } from './types/Status';

const USER_ID = 10524;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(true);
  const [filter, setFilter] = useState<Status>('all');

  useEffect(() => {
    getTodos(USER_ID)
      .then((downloadedTodos) => {
        setTodos(downloadedTodos);
        setFilteredTodos(downloadedTodos);
      });
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredTodos([...todos]);
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'active':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        break;
    }
  }, [filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map((todo) => (
            <TodoField key={todo.id} todo={todo} />
          ))}

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </section>
      </div>
      {/* <div className="todo">
          <label className="todo__status-label">
            <input type="checkbox" className="todo__status" />
          </label>

          <span className="todo__title">Not Completed Todo</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>

        <div className="todo">
          <label className="todo__status-label">
            <input type="checkbox" className="todo__status" />
          </label>

          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div> */}

      {/* <div className="todo">
          <label className="todo__status-label">
            <input type="checkbox" className="todo__status" />
          </label>

          <span className="todo__title">Todo is being saved now</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      </div> */}

      <footer className="todoapp__footer">
        <span className="todo-count">3 items left</span>

        <nav className="filter">
          <a
            href="#/"
            className={classNames('filter__link', {
              selected: filter === 'all',
            })}
            onClick={() => setFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={classNames('filter__link', {
              selected: filter === 'active',
            })}
            onClick={() => setFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={classNames('filter__link', {
              selected: filter === 'completed',
            })}
            onClick={() => setFilter('completed')}
          >
            Completed
          </a>
        </nav>

        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>

      <Notification error={error} action="delete" />
    </div>
  );
};
