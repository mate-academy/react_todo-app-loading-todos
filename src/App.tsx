/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodosList } from './components/TodosList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [filterValue, setFilterValue] = useState('All');
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const filteredTodos = todos.filter(todo => {
    switch (filterValue) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      case 'all':
        return todo;

      default:
        return true;
    }
  });

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(user?.id || 0)
      .then(setTodos)
      .catch(() => {
        setError(true);
        setErrorNotification('Todos cannot be added');
      });
  }, []);

  const activeAllTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const activeTodos = activeAllTodos === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          activeTodos={activeTodos}
        />
        {todos.length > 0 && (
          <TodosList todos={filteredTodos} />
        )}
        <Footer
          todos={todos}
          filterValue={filterValue}
          handlerFilterValue={setFilterValue}
        />
      </div>
      {error && (
        <ErrorNotification
          error={error}
          errorNotification={errorNotification}
          handlerErrorNotification={setError}
        />
      )}
    </div>
  );
};
