/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorMessage } from './components/ErrorMessage';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/FilterEnum';

const USER_ID = 10336;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    }
  }, []);

  const closeError = useCallback(() => {
    setErrorMessage('');
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const activeTodosCounter = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <TodoFooter
              itemCounter={activeTodosCounter}
              selectedFilter={filter}
              onFilterSelect={setFilter}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          onClose={closeError}
        />
      )}
    </div>
  );
};
