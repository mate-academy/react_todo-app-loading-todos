/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
// import classNames from 'classnames';
import { TodoData } from './types/Todo';
import { getTodos } from './api/todos';
import { Notification } from './components/Notification';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { ActionError } from './types/ActionError';
import { NewTodo } from './components/NewTodo';

const USER_ID = 10524;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoData[]>([]);
  const [errorMessage, setErrorMessage] = useState<ActionError | string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((downloadedTodos) => {
        setTodos(downloadedTodos);
        setFilteredTodos(downloadedTodos);
      }).catch(() => {
        setErrorMessage(ActionError.read);
      });
  }, []);

  const handleFilterStatusChange = useCallback((filter: Status) => {
    switch (filter) {
      case 'all':
        setFilteredTodos([...todos]);
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      default:
        break;
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />
          <NewTodo />
        </header>

        <section className="todoapp__main">
          <TodoList todos={filteredTodos} />
        </section>
      </div>

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
        <Filter onFilterStatusChange={handleFilterStatusChange} />
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      </footer>

      <Notification message={errorMessage} />
    </div>
  );
};
