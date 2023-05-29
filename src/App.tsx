import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from './api/todos';
import { Todo as TodoType } from './types/Todo';
import { Notification } from './components/Notification';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 10542;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[] | []>([]);
  const [filter, setFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      const data = await getTodos(USER_ID);

      setTodos(data);
    } catch (error) {
      setErrorMessage('Failed to load todos');
      setTimeout(() => {
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

    switch (filter) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'all':
        filteredTodos = todos;
        break;
      default:
        break;
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
    setErrorMessage('');
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActive={hasActive} />
        <TodoList visibleTodos={visibleTodos} />
        <Footer
          filter={filter}
          filterAll={filterAll}
          filterActive={filterActive}
          filterCompleted={filterCompleted}
          hasCompleted={hasCompleted}
          todosLength={todos.length}
        />
      </div>

      {errorMessage
      && (
        <Notification
          onCleanErrorMessage={handleCleanErrorMessage}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
