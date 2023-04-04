/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorList } from './components/ErrorList/ErrorList';
import {
  TodoFilter,
  FilterTodoStatus,
} from './components/TodoFilter/TodoFilter';

const USER_ID = 6848;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterTodoStatus>(FilterTodoStatus.ALL);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then((result) => setTodos(result))
      .catch(() => setErrors((prevErrors) => [
        ...prevErrors,
        'Unable to get todo list'
      ]));
  }, []);

  useEffect(() => {
    const newActiveTodos = todos.filter((todo) => {
      if (filter === FilterTodoStatus.ACTIVE) {
        return !todo.completed;
      }

      if (filter === FilterTodoStatus.COMPLETED) {
        return todo.completed;
      }

      return true;
    });

    setActiveTodos(newActiveTodos);
  }, [todos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length !== 0 && (
          <>
            <section className="todoapp__main">
              {/* This is a completed todo */}
              <TodoList todos={activeTodos} />
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todos.filter((todo) => !todo.completed).length} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <TodoFilter filter={filter} onFilterChange={setFilter} />

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}

        {/* Hide the footer if there are no todos */}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorList errors={errors} onClear={() => setErrors([])} />
    </div>
  );
};
