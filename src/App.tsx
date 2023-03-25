/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterType } from './types/FilterType';

const USER_ID = 6704;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorText, setErrorText] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const fetchTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorText('Unable to load todos');
      setTimeout(() => {
        setErrorText('');
      }, 3000);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const closeError = () => {
    setErrorText('');
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const visibleTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);

      case FilterType.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, [todos, filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoList
          activeTodos={activeTodos}
          todos={visibleTodos}
          filterType={filterType}
          setFilterType={setFilterType}
          completedTodos={completedTodos}
        />

        {todos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            filterType={filterType}
            setFilterType={setFilterType}
            completedTodos={completedTodos}
          />
        )}
      </div>

      <div
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorText },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={closeError}
        />
        <span>{errorText}</span>
      </div>
    </div>
  );
};
