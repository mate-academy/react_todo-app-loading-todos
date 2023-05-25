import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from './api/todos';
import { Todo as TodoType } from './types/Todo';
import { Todo } from './components/Todo';
import { Filter } from './components/Filter';
import { Notification } from './components/Notification';
import { Header } from './components/Header';

const USER_ID = 10542;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[] | []>([]);
  const [hasError, setHasError] = useState(false);
  const [filter, setFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      const data = await getTodos(USER_ID);

      setTodos(data);
    } catch (error) {
      setHasError(true);
      setErrorMessage('Failed to load todos');
      setTimeout(() => {
        setHasError(false);
        setErrorMessage('');
      }, 3000);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const hasCompleted = todos.filter(todo => todo.completed).length > 0;
  const hasActive = todos.filter(todo => !todo.completed).length > 0;

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    return filteredTodos;
  }, [filter, todos]);

  const filterAll = useCallback(() => {
    setFilter('all');
  }, []);

  const filterCompleted = useCallback(() => {
    setFilter('completed');
  }, []);

  const filterActive = useCallback(() => {
    setFilter('active');
  }, []);

  const handleCleanErrorMessage = useCallback(() => {
    setHasError(false);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActive={hasActive} />
        <section className="todoapp__main">
          {visibleTodos.map(todo => {
            return (
              <Todo
                todo={todo}
                key={todo.id}
              />
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${todos.length} items left`}
            </span>

            <Filter
              filter={filter}
              filterActive={filterActive}
              filterAll={filterAll}
              filterCompleted={filterCompleted}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              style={{ visibility: hasCompleted ? 'visible' : 'hidden' }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {hasError
      && (
        <Notification
          onCleanErrorMessage={handleCleanErrorMessage}
          hasError={hasError}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
