/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';
import { ErrorMessages } from './types/ErrorMessages';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.default,
  );
  const [currentFilter, setCurrentFilter] = useState(FilterType.All);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodoList)
      .catch(() => {
        setErrorMessage(ErrorMessages.getError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const activeTodosCount = todoList.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todoList.some(todo => todo.completed);
  const areAllCompleted =
    todoList.length > 0 && todoList.every(todo => todo.completed);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header areAllCompleted={areAllCompleted} />

        <TodoList
          isLoading={isLoading}
          todoList={todoList}
          currentFilter={currentFilter}
        />

        {todoList.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`}
            </span>

            <TodoFilter
              currentFilter={currentFilter}
              onChange={setCurrentFilter}
            />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        removeError={() => setErrorMessage(ErrorMessages.default)}
      />
    </div>
  );
};
