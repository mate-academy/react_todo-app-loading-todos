/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoItem } from './components/TodoItem';
import { Filter } from './components/Filter';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [error, setError] = useState(Errors.NONE);
  const [status, setStatus] = useState(Status.ALL);

  const loadTodos = async () => {
    if (user) {
      try {
        setError(Errors.NONE);
        const todos = await getTodos(user.id);

        setTodosFromServer(todos);
      } catch {
        setError(Errors.LOAD);
      }
    }
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  const todos = todosFromServer.filter(todo => {
    switch (status) {
      case Status.COMPLETED:
        return todo.completed;

      case Status.ACTIVE:
        return !todo.completed;
      default:
        return todo;
    }
  });

  const activeTodos = todosFromServer.reduce(
    (acc, todo) => (!todo.completed ? 1 : 0) + acc, 0,
  );

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

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <TodoItem todo={todo} />
          ))}
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos} items left`}
          </span>

          <Filter
            status={status}
            setStatus={setStatus}
          />

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </div>

      <ErrorNotification
        error={error}
        setError={setError}
      />
    </div>
  );
};
