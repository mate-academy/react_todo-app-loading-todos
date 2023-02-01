/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './enums/ErrorMessage';
import { Filter } from './enums/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement | null>(null);
  const [userTodos, setUserTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>();
  const [filterStatus, setFilterStatus] = (
    useState(Filter.ALL)
  );

  const normalizeTodos = (todos: Todo[]) => {
    return todos.map(({
      id, title, completed, userId,
    }) => {
      return {
        id,
        userId,
        title,
        completed,
      };
    });
  };

  const getVisibleTodos = () => {
    switch (filterStatus) {
      case Filter.ACTIVE:
        return userTodos.filter((todo) => !todo.completed);
      case Filter.COMPLETED:
        return userTodos.filter((todo) => todo.completed);
      default:
        return userTodos;
    }
  };

  const loadTodos = async (userID: number) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const serverTodos = await getTodos(userID);
      const normalizedTodos = normalizeTodos(serverTodos);

      setUserTodos(normalizedTodos);
    } catch {
      setErrorMessage(ErrorMessage.LOAD);
    } finally {
      setIsLoading(false);
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

  const visibleTodos = useMemo(getVisibleTodos, [filterStatus, userTodos]);
  const unfinishedTodosLeft = userTodos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo
          newTodoInputRef={newTodoField}
        />

        {isLoading && (
          <Loader />
        )}

        {!!userTodos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              unfinishedTodosLeft={unfinishedTodosLeft}
              activeFilter={filterStatus}
              setFilter={setFilterStatus}
            />
          </>
        )}
      </div>

      {!!errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
