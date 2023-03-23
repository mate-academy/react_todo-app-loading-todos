/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
// import collection from './api/collection.json';
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

  const closeError = () => {
    setErrorText('');
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.All:
          return todo;

        case FilterType.Completed:
          return todo.completed;

        case FilterType.Active:
          return !todo.completed;

        default:
          return todos;
      }
    });
  }, [todos, filterType]);

  useEffect(() => {
    closeError();
    fetchTodos();
  }, [fetchTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoList
        activeTodos={activeTodos}
        todos={visibleTodos}
        filterType={filterType}
        setFilterType={setFilterType}
        completedTodos={completedTodos}
      />

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
