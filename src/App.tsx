/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodosFilter } from './types/TodosFilter';
import { Header } from './components/Header/Header';
import {
  ErrorNotifications,
} from './components/ErrorNotifications/ErrorNotifications';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';

const filterTodos = (todos: Todo[], filterType: TodosFilter) => {
  switch (filterType) {
    case TodosFilter.ALL:
      return todos;
    case TodosFilter.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case TodosFilter.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      throw new Error('Unexpected type!');
  }
};

const USER_ID = 10911;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>('');
  const [newTitle, setNewTitle] = useState('');
  const [
    selectFilter,
    setSelectFilter
  ] = useState<TodosFilter>(TodosFilter.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((err) => {
        setError(err.message || 'Smth went wrong!');
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, selectFilter);
  }, [selectFilter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTitle={newTitle}
          onNewTitle={setNewTitle}
          visibleTodos={visibleTodos}
        />

        {visibleTodos.length > 0 && (
          <TodoList
            visibleTodos={visibleTodos}
          />
        )}

        {todos.length > 0 && (
          <Footer
            selectFilter={selectFilter}
            onSelectFilter={setSelectFilter}
          />
        )}
      </div>

      {error && (
        <ErrorNotifications
          error={error}
          onError={setError}
        />
      )}
    </div>
  );
};
