/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { FilterStatus } from './enums/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = (
    useState<FilterStatus>(FilterStatus.ALL)
  );

  const loadTodos = async (userID: number) => {
    setError('');
    try {
      const serverTodos = await getTodos(userID);
      const normalizedTodos = serverTodos.map(({
        id, title, completed, userId,
      }) => {
        return {
          id,
          userId,
          title,
          completed,
        };
      });

      setUserTodos(normalizedTodos);
    } catch {
      setError('Unable to load todos');
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      loadTodos(user.id);
    }
  }, []);

  const visibleTodos = useMemo(() => {
    return userTodos.filter((todo) => {
      switch (filterStatus) {
        case FilterStatus.ACTIVE:
          return !todo.completed;
        case FilterStatus.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [filterStatus, userTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          newTodoField={newTodoField}
        />

        {!!userTodos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              activeFilter={filterStatus}
              setFilter={setFilterStatus}
            />
          </>
        )}
      </div>

      {!!error && (
        <ErrorNotification
          errorMessage={error}
        />
      )}
    </div>
  );
};
