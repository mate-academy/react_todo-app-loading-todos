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
        'Unable to get todo list',
      ]));
  }, []);

  useEffect(() => {
    const newActiveTodos = todos.filter((todo) => {
      switch (filter) {
        case FilterTodoStatus.ACTIVE:
          return !todo.completed;

        case FilterTodoStatus.COMPLETED:
          return todo.completed;
      
        default:
          return true;
      }
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
          <button type="button" className="todoapp__toggle-all active" />

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
              <TodoList todos={activeTodos} />
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${todos.filter((todo) => !todo.completed).length} items left`}
              </span>

              <TodoFilter filter={filter} onFilterChange={setFilter} />

              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}

      </div>

      <ErrorList errors={errors} onClear={() => setErrors([])} />
    </div>
  );
};
