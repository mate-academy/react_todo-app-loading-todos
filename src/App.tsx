/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fileterType, setFileterType] = React.useState('all');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const receivedTodos = await getTodos(2);

        setTodos(receivedTodos);
      } catch (errorFromServer) {
        setErrorMessage(`${errorFromServer}`);
      }
    };

    getTodosFromServer();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (fileterType) {
      case FilterType.All:
        return todo;
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return null;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              filterType={fileterType}
              handleFilterType={setFileterType}
              todos={todos}
            />
          </>
        )}
      </div>
      <ErrorNotification
        error={error}
        handleErrorClose={setError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
