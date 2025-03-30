/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { Errors } from './types/Errors';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilterTodo, setStatusFilterTodo] = useState(FilterBy.All);
  const [warning, setWarning] = useState<Errors | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setWarning(null);

    const timer = setTimeout(() => {
      setWarning(null);
    }, 3000);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setWarning(Errors.Load);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const todoFilter = todos.filter(todo => {
    if (statusFilterTodo === FilterBy.All) {
      return true;
    }

    if (statusFilterTodo === FilterBy.Active) {
      return !todo.completed;
    }

    if (statusFilterTodo === FilterBy.Completed) {
      return todo.completed;
    }

    return true;
  });

  const handleUpdateTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodo => currentTodo.filter(todo => todo.id !== todoId));
      })
      .catch(() => setWarning(Errors.Delete));
  };

  const handleCheckCompletedAllTodos = () => {
    const checkCompletedAll = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !checkCompletedAll,
      })),
    );
  };

  const handleClearTodo = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          handleCheckCompletedAllTodos={handleCheckCompletedAllTodos}
          todos={todos}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <TodoList
              todoFilter={todoFilter}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
            <TodoFooter
              todos={todos}
              statusFilterTodo={statusFilterTodo}
              setStatusFilterTodo={setStatusFilterTodo}
              handleClearTodo={handleClearTodo}
            />
          </>
        )}

        {/* Hide the footer if there are no todos */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification warning={warning} setWarning={setWarning} />
    </div>
  );
};
