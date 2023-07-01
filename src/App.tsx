/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';

import { Todo } from './types/Todo';
import { TodoStatusFilter } from './types/TodoStatusFilter';
import { getFilteredTodos } from './helpers';
import { getTodos } from './api/todos';

import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';

const USER_ID = 10884;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState(TodoStatusFilter.All);
  const [error, setError] = useState<string | null>(null);

  const closeError = () => {
    setError(null);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch((errorFromServer) => {
        setError(errorFromServer.message);
      });
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (error) {
      timerId = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, statusFilter);
  }, [statusFilter, todos]);

  const selectStatusFilter = (status: TodoStatusFilter) => {
    setStatusFilter(status);
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const isVisibleClearCompleted = completedTodosCount > 0;
  const isVisibleTodoList = visibleTodos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {!isVisibleTodoList && (
          <>
            <TodoList todos={visibleTodos} />

            <section className="todoapp__main">
              {/* This is a completed todo */}
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
            <TodoFooter
              status={statusFilter}
              onSelectStatusFilter={selectStatusFilter}
              uncompletedTodosCount={activeTodosCount}
              isVisibleClearCompleted={isVisibleClearCompleted}
            />
          </>
        )}
      </div>

      <TodoError error={error} onCloseError={closeError} />
    </div>
  );
};
