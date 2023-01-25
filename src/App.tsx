/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { Filters, Footer } from './components/Footer/Footer';
import { Errors } from './components/Errors/Errors';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(Filters.all);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setError('Unable to load a todos'))
    }
  }, []);

  const activeTodos = () => (
    todos.filter(todo => !todo.completed).length
  );

  const filteredTodos = () => (
    todos.filter(todo => {
      switch (filter) {
        case Filters.completed:
          return todo.completed;
        case Filters.active:
          return !todo.completed;
        default:
          return todo;
      }
    })
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
        />
        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
            />
            <Footer
              activeTodos={activeTodos}
              filter={filter}
              onChange={setFilter}
            />
          </>
        )}
      </div>

      {error && (
        <Errors
          errorMessage={error}
          onHideError={setError}
        />
      )}
    </div>
  );
};
