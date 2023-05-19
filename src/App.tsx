/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Options } from './types/Options';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

const USER_ID = 10349;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState(Options.ALL);
  const [error, setError] = useState('');

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (option) {
        case Options.ACTIVE:
          return todo.completed;
        case Options.COMLETED:
          return !todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, option]);

  const handleOption = useCallback((value: Options) => {
    setOption(value);
  }, []);

  const isActiveTodo = useMemo(() => {
    return visibleTodos.some(todo => {
      return !todo.completed;
    });
  }, []);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(errorMessage => setError(errorMessage));
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        return setError('');
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn(
              'todoapp__toggle-all',
              { active: isActiveTodo },
            )}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              option={option}
              onFilterChange={handleOption}
              todos={todos}
            />
          </>
        )}
      </div>

      <div className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !error },
      )}
      >

        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        {error}
      </div>
    </div>
  );
};
