import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from './api/todos';
import { Todo as TodoType } from './types/Todo';
import { Notification } from './components/Notification';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';

const USER_ID = 10542;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[] | []>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
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

  const filterVisibleTodos
    = (filterList: FilterType, todoList: TodoType[]) => {
      const filteredTodos = todoList;

      return filteredTodos.filter(todo => {
        switch (filterList) {
          case FilterType.Completed:
            return todo.completed;
          case FilterType.Active:
            return !todo.completed;
          case FilterType.All:
          default:
            return todo;
        }
      });
    };

  const visibleTodos = useMemo(
    () => filterVisibleTodos(filter, todos),
    [todos, filterVisibleTodos],
  );

  const handleFilterChange = useCallback(
    (newFilter: FilterType) => setFilter(newFilter),
    [],
  );

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
          onFilterChange={handleFilterChange}
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
