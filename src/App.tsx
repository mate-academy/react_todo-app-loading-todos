/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { filterTodos } from './helper/utilsFunctions';
import { Footer } from './components/Footer/Footer';
import { FilterTypes } from './types/FilterTypes';
/* eslint-disable-next-line max-len */
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<FilterTypes>(
    FilterTypes.All,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const areTodosExist = !!todos?.length;
  const notCompletedTodosCount = todos?.filter(todo => !todo.completed).length;

  const filteredTodos = filterTodos(todos, selectedTodos);
  const handleError = (error: string) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        handleError(ErrorMessage.LoadingError);
      });
  }, []);

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

        {areTodosExist && <TodoList todos={filteredTodos} />}
        {areTodosExist && (
          <Footer
            notCompletedTodosCount={notCompletedTodosCount}
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
