/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { TodoList } from './components/TodoList';
import { FilterTypes } from './types/FilterTypes';
import { Footer } from './components/Footer';
import { TodoField } from './components/TodoField';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [filterType, setFilterType] = useState<FilterTypes>(FilterTypes.all);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterTypes.active:
        return !todo.completed;

      case FilterTypes.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos(user?.id || 0);

        setTodos(loadedTodos);
      } catch (error) {
        setLoadError(true);
      }
    };

    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoField
          todos={todos}
          newTodo={newTodoField}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              todos={filteredTodos}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {loadError && (
        <ErrorMessage
          error={error}
          closeError={setError}
        />
      )}
    </div>
  );
};
