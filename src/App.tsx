import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setError] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const loadTodos = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setError('');
      const loadedTodos = await getTodos(user.id);

      setTodos(loadedTodos);
    } catch (error) {
      setError('Can\'t load todos');
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const filterTodos = () => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return todo;

        case FilterType.Active:
          return todo.completed === false;

        case FilterType.Completed:
          return todo.completed === true;

        default:
          throw new Error('Invalid type');
      }
    });
  };

  const filteredTodos = filterTodos();
  const activeTodos = todos.filter(todo => todo.completed === false).length;
  const hasCompletedTodos = todos.some(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              activeTodos={activeTodos}
              hasCompletedTodos={hasCompletedTodos}
              filterType={filterType}
              onChangeType={setFilterType}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          error={errorMessage}
          onClick={setError}
        />
      )}
    </div>
  );
};
