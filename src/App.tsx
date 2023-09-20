/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { TodosItem } from './components/TodosItem/TodosItem';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Notification } from './components/Notification/Notification';
import { StatusEnum } from './types/StatusEnum';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

const USER_ID = 11497;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<StatusEnum>(
    window.location.hash.slice(2) as StatusEnum || StatusEnum.All,
  );

  const handleChangeFilter = (newFilter: StatusEnum) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const notCompletedTodosLength = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
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
          {todos.filter(todo => {
            switch (filter) {
              case StatusEnum.Active:
                return !todo.completed;
              case StatusEnum.Completed:
                return todo.completed;
              case StatusEnum.All:
              default:
                return todo;
            }
          }).map(todo => (
            <TodosItem todo={todo} />
          ))}
        </section>

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${notCompletedTodosLength} items left`}
            </span>

            <TodosFilter filter={filter} onChangeFilter={handleChangeFilter} />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Notification
        errorMessage={errorMessage}
        onCloseErrorMessage={setErrorMessage}
      />
    </div>
  );
};
