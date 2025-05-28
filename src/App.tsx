/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';

export enum FilterName {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterValue, setFilterValue] = useState<FilterName>(FilterName.ALL);

  const activeTodosQuantity = todos.filter(todo => !todo.completed).length;

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(clearErrorMessage, 3000);
      });
  }

  const filteredTodos = useMemo(() => {
    switch (filterValue) {
      case FilterName.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterName.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterValue]);

  useEffect(loadTodos, []);

  const handleTodoChange = (id: number, completed: boolean) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo,
      ),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header activeTodosQuantity={activeTodosQuantity} />
        {todos.length > 0 && (
          <TodoList todos={filteredTodos} onChange={handleTodoChange} />
        )}
        {todos.length > 0 && (
          <Footer
            activeTodosQuantity={activeTodosQuantity}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            totalTodos={todos.length}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClearError={clearErrorMessage}
      />
    </div>
  );
};
