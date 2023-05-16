/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Sort } from './utils/Sort';
import { Errors } from './utils/Errors';
import { TodosList } from './components/TodosList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

const USER_ID = 10360;

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<Sort>(Sort.All);
  const [errorType, setErrorType] = useState<Errors>(Errors.None);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setErrorType(Errors.Add);
      setTimeout(() => {
        setErrorType(Errors.None);
      }, 3000);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const sortingTodos = (type: Sort) => {
    switch (type) {
      case Sort.Active:
        return todos.filter(todo => !todo.completed);
      case Sort.Completed:
        return todos.filter(todo => todo.completed);
      case Sort.All:
      default:
        return todos;
    }
  };

  const setErrorMessage = useCallback(() => {
    switch (errorType) {
      case Errors.Add:
        return 'Unable to add a todo';
      case Errors.Delete:
        return 'Unable to delete a todo';
      case Errors.Update:
        return 'Unable to update a todo';
      default:
        return 'Unpredictable error';
    }
  }, [errorType]);

  const isAnyActiveTodo = useMemo(() => {
    return todos.some(todo => !todo.completed);
  }, [todos]);
  const isAnyCompletedTodo = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);
  const itemsLeftToComplete = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);
  const sortedTodos = sortingTodos(sortType);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {isAnyActiveTodo && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(event) => {
                setNewTodo(event.target.value);
              }}
            />
          </form>
        </header>

        <TodosList todos={sortedTodos} />

        {todos.length > 0 && (
          <Footer
            itemsLeftToComplete={itemsLeftToComplete}
            isAnyCompletedTodo={isAnyCompletedTodo}
            sortType={sortType}
            setSortType={setSortType}
          />
        )}
      </div>

      {errorType !== Errors.None && (
        <Error
          setHasError={setErrorType}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
