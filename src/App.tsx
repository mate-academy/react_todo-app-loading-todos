/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
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
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to show todos');
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
          {!!todos.length && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
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
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            <TodosFilter filter={filter} onChangeFilter={handleChangeFilter} />

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <Notification
          errorMessage={errorMessage}
          onCloseErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
