/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
// import { UserWarning } from './UserWarning';
import Header from './components/Header/Header';
import { Status } from './types/Status';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { ErrorType } from './types/Error';
import { todoFilter } from './utils/todoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [status, setStatus] = useState<Status>(Status.All);

  const filteredTodo = todoFilter(todos, status);

  const activeTodoCount = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0,
  );
  const hasCompletedTodos = todos.some(todo => todo.completed);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const result = await getTodos();

        setTodos(result);
      } catch (e) {
        setError('load');

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    };

    fetchTodo();
  }, [error, status]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodo} />
        <Footer
          setStatus={setStatus}
          status={status}
          activeTodoCount={activeTodoCount}
          hasCompletedTodos={hasCompletedTodos}
        />
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
