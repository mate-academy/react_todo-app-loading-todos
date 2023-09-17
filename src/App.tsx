/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Filters } from './utils/Filters';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

const USER_ID = 11437;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorHidden, setIsErrorHidden] = useState(true);

  const [filterParam, setFilterParam] = useState(Filters.All);

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage(JSON.parse(error.message).error);
        setIsErrorHidden(false);

        setTimeout(() => {
          setIsErrorHidden(true);
        }, 3000);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filterParam) {
      case Filters.Active:
        return todos.filter(({ completed }) => !completed);

      case Filters.Completed:
        return todos.filter(({ completed }) => completed);

      case Filters.All:
        return todos;

      default:
        return todos;
    }
  }, [filterParam, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo />

        <section className="todoapp__main">
          <TodoList todos={visibleTodos} />
          <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span className="todo__title">Completed Todo</span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is not completed */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span className="todo__title">Not Completed Todo</span>
            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
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
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        {!!todos?.length && (
          <TodoFilter
            todos={todos}
            filterParam={filterParam}
            onFilterChange={(newFilter) => setFilterParam(newFilter)}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: isErrorHidden },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsErrorHidden(true)}
        />

        {/* show only one message at a time */}
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
