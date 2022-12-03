import React, {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { NewTodoField } from './components/NewTodoField';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.All);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    setErrorMessage('');

    getTodos(user.id)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos for such user'));
  }, [user?.id]);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (selectedStatus) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        case Status.All:
        default:
          return true;
      }
    });
  }, [todos, selectedStatus]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoField newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFilter
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              selectedStatus={selectedStatus}
              onSelectedStatus={setSelectedStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
