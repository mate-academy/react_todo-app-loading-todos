// eslint-disable-next-line
import React, { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';
import { Error } from './types/Error';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
// eslint-disable-next-line
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState<Error>({
    hasError: false,
    hasMessage: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const getTodosFromServer = async (userId: number) => {
    try {
      const todosFromServer = await getTodos(userId);

      setTodos(todosFromServer);
      // eslint-disable-next-line
    } catch (error: any) {
      setErrorMessage({
        hasError: true,
        hasMessage: error.message,
      });
    }
  };

  const filteredTodos = useMemo(
    () => (
      todos.filter((todo) => {
        switch (filterBy) {
          case FilterType.Active:
            return !todo.completed;
          case FilterType.Completed:
            return todo.completed;
          default:
            return todos;
        }
      })),
    [todos, filterBy],
  );

  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos],
  );

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodosFromServer(user.id);
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage({
        hasError: false,
        hasMessage: '',
      });
    }, 3000);
  }, [errorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList filteredTodos={filteredTodos} />

        <Footer
          activeTodos={activeTodos}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
      </div>

      {errorMessage.hasMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
