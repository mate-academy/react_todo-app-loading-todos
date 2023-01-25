/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TododList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      setErrorMessage('');
      const loadedTodos = await getTodos(user.id);

      setTodos(loadedTodos);
    } catch (error) {
      setErrorMessage('Something went wrong while loading todos');
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.All:
        return todos;

      case FilterType.Active:
        return todos.filter(todo => !todo.completed);

      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        throw new Error('Invalid type');
    }
  }, [todos, filterType]);

  const activeTodosAmount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const hasCompletedTodos = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              activeTodosAmount={activeTodosAmount}
              hasCompletedTodos={hasCompletedTodos}
              filterType={filterType}
              onChangeFilterType={setFilterType}
            />
          </>
        )}
      </div>

      <ErrorMessage
        error={errorMessage}
        handleSetErrorMessage={setErrorMessage}
      />
    </div>
  );
};
