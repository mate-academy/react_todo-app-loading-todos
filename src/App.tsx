/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/Error/ErrorNotification';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoCount } from './components/TodoCount/TodoCount';
import { TodoFilter } from './components/Filter/TodoFilter';
// import { TodoFooter } from './components/Footer/TodoFooter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    getTodos(4)
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => setErrorMessage('Unable to load data'));
  }, []);

  const activeTodo = todos.filter((todo) => {
    return !todo.completed;
  });

  const visibleTodo = todos.filter((todo) => {
    switch (sortBy) {
      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return todo;
    }
  });

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

        <TodoList todos={visibleTodo} />

        <footer className="todoapp__footer" data-cy="Footer">
          <TodoCount activeTodo={activeTodo} />
          <TodoFilter setSortBy={setSortBy} />
        </footer>

      </div>
      {errorMessage && <ErrorNotification errorMessage={errorMessage} />}

    </div>
  );
};
