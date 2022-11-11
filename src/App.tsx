/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { TodoError } from './components/TodoError/TodoError';
import { Footer } from './components/Footer/Footer';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

import { FilterType } from './types/FilterType';
import { ErrorType } from './types/ErrorType';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [error, setError] = useState<ErrorType>({
    status: false,
    message: '',
  });

  const user = useContext(AuthContext);

  const loadTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch {
        setError({ status: true, message: '' });
      }
    }
  }, []);

  const handleFilterSelect = useCallback((filterType: FilterType) => {
    setFilterBy(filterType);
  }, []);

  const handleCloseError = useCallback(() => {
    setError({ status: false, message: '' });
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterType.ALL:
          return todo;

        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  }, [filterBy, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <NewTodo />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              todos={todos}
              filterBy={filterBy}
              onFilterSelect={handleFilterSelect}
            />
          </>
        )}
      </div>

      <TodoError
        error={error}
        onCloseError={handleCloseError}
      />
    </div>
  );
};
