/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMes } from './components/ErrorMes';
import { FilterName } from './types/enumFilterName';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredBy, setFilteredBy] = useState<FilterName>(FilterName.ALL);

  const activeTodos = todos.filter(todo => !todo.completed).length;

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }

  const filteredTodos = useMemo(() => {
    switch (filteredBy) {
      case FilterName.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterName.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filteredBy]);

  useEffect(loadTodos, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodos={activeTodos} />
        {todos.length > 0 && <TodoList filteredTodos={filteredTodos} />}
        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            filteredBy={filteredBy}
            setFilteredBy={setFilteredBy}
            todos={todos}
          />
        )}
      </div>

      <ErrorMes errorMessage={errorMessage} />
    </div>
  );
};
