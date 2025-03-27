/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { ErrorMessages, FilterStatus, Todo } from './types/Todo';
import { Header } from './component/Header';
import { Footer } from './component/Footer';
import { ErrorNotification } from './component/ErrorNotification';
import { TodoList } from './component/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.DEFAULT,
  );
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

  function loadTodos() {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.LOAD_TODOS);
        setTimeout(() => {
          setErrorMessage(ErrorMessages.DEFAULT);
        }, 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadTodos, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.ACTIVE:
        return !todo.completed;
      case FilterStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleDeleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const handleTodoStatusChange = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleChangeCompletedAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const handleDeleteAllCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          handleChangeCompletedAllTodos={handleChangeCompletedAllTodos}
        />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <TodoList
            filteredTodos={filteredTodos}
            handleTodoStatusChange={handleTodoStatusChange}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleDeleteAllCompletedTodos={handleDeleteAllCompletedTodos}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
