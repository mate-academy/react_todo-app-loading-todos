import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [
    statusToFilter,
    setStatusToFilter,
  ] = useState<TodosFilter>(TodosFilter.All);
  const [hasError, setHasError] = useState(false);

  const closeNotification = useCallback(() => setHasError(false), []);

  const filterTodosBy = useCallback((status: TodosFilter) => {
    const filtredByStatusTodos = todos.filter(({ completed }) => {
      switch (status) {
        case TodosFilter.Active:
          return !completed;

        case TodosFilter.Completed:
          return completed;

        default:
          return true;
      }
    });

    setStatusToFilter(status);
    setFiltredTodos(filtredByStatusTodos);
  }, [todos]);

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setFiltredTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => setHasError(false), 3000);
  }, [hasError]);

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

        {todos.length > 0 && (
          <>
            <TodoList filtredTodos={filtredTodos} />

            <Footer
              TodosLength={filtredTodos.length}
              statusToFilter={statusToFilter}
              filterTodosBy={filterTodosBy}
            />
          </>
        )}
      </div>

      <ErrorNotification
        hasError={hasError}
        closeNotification={closeNotification}
      />
    </div>
  );
};
