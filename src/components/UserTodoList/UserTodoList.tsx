import React, { useEffect } from 'react';
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodoFilter';
import { Notification } from '../Notification';
import { getTodos } from '../../api/todos';
import { useTodoContext } from '../TodoContextProvider';

type Props = {
  userId: number;
};

export const UserTodoList: React.FC<Props> = ({ userId }) => {
  const {
    todos, error, setTodos, setError, setLoading,
  } = useTodoContext();

  const hasTodos = todos.length > 0;

  const loadTodos = () => {
    setLoading(true);
    setError('');

    getTodos(userId)
      .then(setTodos)
      .catch(() => setError('Failed to load todos'))
      .finally(() => setLoading(false));
  };

  useEffect(loadTodos, [userId]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <TodoForm />

        {hasTodos && <TodoList />}

        {hasTodos && <TodoFilter />}

      </div>

      {error
        && (
          <Notification
            error={error}
            closeNotification={() => setError('')}
          />
        )}

    </div>
  );
};
