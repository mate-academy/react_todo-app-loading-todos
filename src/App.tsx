/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Notifications } from './Components/Notifications';
import { FilterType } from './types/FilterType';

const USER_ID = 6677;

const handleFilteringTodos = (todos: Todo[], filterType: FilterType) => {
  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.ACTIVE:
        return !todo.completed;
      case FilterType.COMPLETED:
        return todo.completed;
      case FilterType.ALL:
        return true;
      default:
        return todo;
    }
  });

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [error, setError] = useState(false);

  const visibleTodos = handleFilteringTodos(todos, filterType);

  const handleTodos = async () => {
    try {
      setError(false);
      const currentTodo = await getTodos(USER_ID);

      setTodos(currentTodo);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    handleTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            todos={visibleTodos}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}
      </div>

      {error && (
        <Notifications setError={setError} />
      )}
    </div>
  );
};
