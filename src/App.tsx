/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
// import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Notification } from './components/Notification';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { FilterBy } from './types/TodosFilter';
import { Footer } from './components/Footer';

const USER_ID = 10353;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  };

  loadTodos();

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FilterBy.ALL:
        return true;

      case FilterBy.COMPLETED:
        return todo.completed;

      case FilterBy.ACTIVE:
        return !todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header
          todos={todos}
        />

        {todos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onSetFilter={setFilter}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      {hasError && (
        <Notification />
      )}

    </div>
  );
};
