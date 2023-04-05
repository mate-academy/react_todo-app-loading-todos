import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import { getUsers } from './api/users';
import { getTodos } from './api/todos';
import { Login } from './Login';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './components/Filter/Filter';
import { NewTodo } from './components/NewTodo/NewTodo';
import NotificationError from
  './components/NotificationError/NotificationError';

export const App: React.FC = () => {
  const [task, setTask] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const [error, setError] = useState<string>('');

  const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const [userId, setUserId] = useState(NaN);

  const loadTodos = async () => {
    try {
      await getTodos(userId).then(res => setTodos(res));
    } catch {
      setError('unable to get todos');
    }
  };

  useEffect(() => {
    getUsers();
  }, [localStorage.getItem('userId')]);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setUserId(Number(localStorage.getItem('userId')));
    }
  }, [localStorage.getItem('userId')]);

  useEffect(() => {
    if (userId) {
      loadTodos();
    }
  }, [userId]);

  const resetError = () => setError('');

  if (!localStorage.getItem('userId')) {
    return <Login />;
  }

  if (!userId) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title is-1">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          handleTodoChange={handleTodoChange}
          task={task}
        />

        <Filter todos={todos} />
      </div>

      {
        error
        && (
          <NotificationError
            error={error}
            resetError={resetError}
          />
        )
      }
    </div>
  );
};
