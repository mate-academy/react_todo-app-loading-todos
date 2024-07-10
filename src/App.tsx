/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [status, setStatus] = useState(Status.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    if (status === Status.All) {
      return todos;
    }

    return todos.filter(todo =>
      status === Status.Completed ? todo.completed : !todo.completed,
    );
  }, [todos, status]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleCompletedStatus = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList
          todos={filteredTodos}
          isEditingTodo={tempTodo}
          setIsEditingTodo={setTempTodo}
          handleCompletedStatus={handleCompletedStatus}
        />

        {!!todos.length && (
          <TodoFilter setStatus={setStatus} status={status} todos={todos} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
