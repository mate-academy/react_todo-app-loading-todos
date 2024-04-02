import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './Components/Footer/Footer';
import { StatesOfFilter } from './types/StatesOfFilter';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { ErrorNotification } from './Components/ErrorNotification';
import { getCountOfActiveTodos } from './utils/getCountOfActiveTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<StatesOfFilter>(StatesOfFilter.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlerErrorShow = (error: string): void => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        handlerErrorShow('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handlerSetFilter = (filterSet: StatesOfFilter): void => {
    setFilterBy(filterSet);
  };

  const handlerErrorMessage = (message: string): void => {
    setErrorMessage(message);
  };

  const visibleTodos = getFilteredTodos(todos, filterBy);
  const counterTodos = getCountOfActiveTodos(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList currentTodos={visibleTodos} />
        </section>

        {!!todos.length && (
          <Footer
            onSetFilter={handlerSetFilter}
            countOfTodos={counterTodos}
            selectedFilter={filterBy}
          />
        )}
      </div>

      <ErrorNotification
        messageError={errorMessage}
        setMessageError={handlerErrorMessage}
      />
    </div>
  );
};
