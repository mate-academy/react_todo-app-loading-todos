/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Errors } from './components/Errors';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [errorText] = useState('');
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const filtredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.ALL:
        return todos;
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return [];
    }
  });

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setError(false));
    }

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  },
  []);

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
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />
          </form>
        </header>
      </div>
      { todos.length
      && (
        <>
          <TodoList
            todos={filtredTodos}
          />
          <Footer
            setFilter={setFilter}
            todos={todos}
            filter={filter}
          />
          <Errors
            error={error}
            setError={setError}
            errorText={errorText}
          />
        </>
      )}
    </div>
  );
};
