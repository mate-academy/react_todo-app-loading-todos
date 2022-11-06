/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotice } from './components/ErrorNotice';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [hasError, setHasError] = useState(false);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  const getFilteredTodos = useCallback((type: FilterType) => {
    const filtredByTypeTodos = todos.filter(({ completed }) => {
      switch (type) {
        case FilterType.ACTIVE:
          return !completed;

        case FilterType.COMPLETED:
          return completed;

        default:
          return true;
      }
    });

    setFilterType(type);
    setVisibleTodos(filtredByTypeTodos);
  }, [todos]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">
        todos
      </h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length !== 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />

            <Footer
              leftTodos={visibleTodos.length}
              filterType={filterType}
              getFilteredTodos={getFilteredTodos}
            />
          </>
        )}
      </div>

      {hasError && (
        <ErrorNotice
          hasError={hasError}
          setHasError={setHasError}
        />
      )}
    </div>
  );
};
