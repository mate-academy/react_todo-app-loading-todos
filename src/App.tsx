import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { NewTodo } from './components/NewTodo/NewTodo';
import { FilterOption } from './types/FilterOption';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [hideError, setHideError] = useState(true);
  const [filterOption, setFilterOption] = useState(FilterOption.All);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const filteredTodos = () => {
    if (filterOption === FilterOption.Active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filterOption === FilterOption.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  };

  useEffect(() => {
    setHideError(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setHideError(false);
        setTimeout(() => {
          setHideError(true);
        }, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo activeTodosCount={activeTodosCount} />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos()} />
            <TodoFooter
              activeTodosCount={activeTodosCount}
              selectedFilter={filterOption}
              onFilterChange={setFilterOption}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: hideError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHideError(true)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
