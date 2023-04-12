import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import { getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './components/Filter/Filter';
import { NewTodo } from './components/NewTodo/NewTodo';
import NotificationError from
  './components/NotificationError/NotificationError';

const USER_ID = 6846;

export const App: React.FC = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

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
    loadTodos();
  }, []);

  const resetError = () => setError('');

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
