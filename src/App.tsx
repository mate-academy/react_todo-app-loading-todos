/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { FilterBy, Todo } from './types/types';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = 10348;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState(FilterBy.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const getFilteredTodos = useMemo(() => {
    switch (filteredBy) {
      case FilterBy.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterBy.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filteredBy, todos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosFromServer: Todo[] = await getTodos(USER_ID);

        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodos);
  }, [filteredBy, getFilteredTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodosCount={activeTodosCount}
        />

        <TodoList
          todos={filteredTodos}
        />

        {todos.length > 0 && (
          <Footer
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            filteredBy={filteredBy}
            setFilteredBy={setFilteredBy}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
