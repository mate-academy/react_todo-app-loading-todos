/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { FilterStatusType, Todo } from './types/Todo';
import * as tadoService from './api/todos';
import classNames from 'classnames';
import { Footer } from './component/Footer';
import { Error } from './component/Error';
import { UserWarning } from './UserWarning';

function todoInUse(todo: Todo[], filter: FilterStatusType) {
  const todoUsed = [...todo];

  switch (filter) {
    case FilterStatusType.All:
      return todoUsed;
    case FilterStatusType.Active:
      return todoUsed.filter(todoItem => todoItem.completed === false);
    case FilterStatusType.Completed:
      return todoUsed.filter(todoItem => todoItem.completed === true);
    default:
      return todoUsed;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterStatusType>(
    FilterStatusType.All,
  );

  const [errorMessage, setErrorMessage] = useState(true);

  useEffect(() => {
    tadoService
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage(false);
        alert(error);
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMessage(true);
        }, 3000);
      });
  }, []);

  if (!tadoService.USER_ID) {
    return <UserWarning />;
  }

  const tasks = todoInUse(todos, filterBy);

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
          {tasks.map(todo => (
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
        {todos.length > 0 && (
          <Footer setFilterBy={setFilterBy} todos={todos} filterBy={filterBy} />
        )}
      </div>
      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
