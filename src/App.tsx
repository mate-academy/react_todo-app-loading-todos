/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ForComletedTodo } from './types/enumFilter';
import { TodoItem } from './Components/TodoItem';
import { Footer } from './Components/Footer';

const USER_ID = 11511;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [condition, setCondition] = useState(ForComletedTodo.All);
  const [hasErrorOnLoading, setHasErrorOnLoading] = useState(false);

  const isAllCopleted = todos.every(todo => todo.completed);
  const hasTodos = todos.length > 0;

  const fetchData = async () => {
    try {
      setHasErrorOnLoading(false);
      const todosFetch = await getTodos(USER_ID);

      setTodos(todosFetch);
    } catch (err) {
      setHasErrorOnLoading(true);
      setTimeout(() => setHasErrorOnLoading(false), 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTodos = useMemo(() => todos.filter(({ completed }) => {
    switch (condition) {
      case ForComletedTodo.Active:
        return !completed;
      case ForComletedTodo.Completed:
        return completed;
      default:
        return 1;
    }
  }), [condition, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {hasTodos && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: isAllCopleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}

          {/* This todo is not completed */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is being edited */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

          {/* This form is shown instead of the title and remove button */}
          {/* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}

          {/* This todo is in loadind state */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
        </section>

        {/* Hide the footer if there are no todos */}
        {hasTodos && (
          <Footer
            todos={todos}
            condition={condition}
            setCondition={setCondition}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !hasErrorOnLoading,
          },
        )}
      >

        <button
          type="button"
          className="delete"
          onClick={() => setHasErrorOnLoading(false)}
        />
        {/* show only one message at a time */}
        {hasErrorOnLoading && (
          'Unable to load todos'
        )}

        {/* <br /> */}
        {/* Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
