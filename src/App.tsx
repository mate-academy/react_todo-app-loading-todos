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

const USER_ID = localStorage.getItem('userId');

export const App: React.FC = () => {
  const [task, setTask] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

  const [error, setError] = useState<string>('');

  const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const loadTodos = async () => {
    try {
      await getTodos(Number(USER_ID)).then(res => setTodos(res));
    } catch {
      setError('unable to get todos');
    }
  };

  useEffect(() => {
    getUsers();
  }, [USER_ID]);

  useEffect(() => {
    if (USER_ID) {
      loadTodos();
    }
  }, [USER_ID]);

  const resetError = () => setError('');

  if (!USER_ID) {
    return <Login />;
  }

  if (!USER_ID) {
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
