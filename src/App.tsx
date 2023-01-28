/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  memo, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
// import cn from 'classnames';

import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { TodoList } from './components/TodoList';
import { FilterTypes } from './types/FilterTypes';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { getFilteredTodos } from './helpers/helpers';

export const App: React.FC = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState(FilterTypes.ALL);

  const handleFilterOptionClick = (newOption: FilterTypes) => {
    if (selectedFilterType !== newOption) {
      setSelectedFilterType(newOption);
    }
  };

  const showErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      showErrorMessage('');
    }, 3000);
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          showErrorMessage('Unable to load a todos');
        });
    }
  }, [showErrorMessage, user]);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedFilterType);
  }, [todos, selectedFilterType]);

  const filterOptions = useMemo(() => {
    return Object.values(FilterTypes);
  }, []);

  const activeItemsCounter = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              setFilterType={handleFilterOptionClick}
              itemsCounter={activeItemsCounter}
              filterOptions={filterOptions}
              filterType={selectedFilterType}
            />
          </>
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        onCloseBtnClick={() => setErrorMessage('')}
      />
    </div>
  );
});
