/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Errors } from './components/Errors';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');

  if (error) {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(user?.id || 0)
      .then(setTodos)
      .catch(() => (
        setError('Unable to load todo from server')
      ));
  }, []);

  const todosLeft = todos.reduce((acc, todo) => {
    if (!todo.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const filtredTodos = todos.filter(todo => {
    if ((filterType === 'active' && todo.completed)
     || (filterType === 'completed' && !todo.completed)) {
      return false;
    }

    return todo;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

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

        {todos.length > 0 && (
          <>
            <TodoList todos={filtredTodos} />
            <Footer
              todosLeft={todosLeft}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}

      </div>

      {error && <Errors error={error} unSetError={setError} />}
    </div>
  );
};
