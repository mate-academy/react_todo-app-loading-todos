/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { FilterType, Todo } from './types/Todo';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';
import * as tadoService from './api/todos';
import classNames from 'classnames';
import { Footer } from './component/Footer';
import { Error } from './component/Error';
import { UserWarning } from './UserWarning';

function todoInUse(todo: Todo[], filter: FilterType) {
  const todoUsed = [...todo];

  switch (filter) {
    case 'all':
      return todoUsed;
    case 'active':
      return todoUsed.filter(todoItem => todoItem.completed === false);
    case 'completed':
      return todoUsed.filter(todoItem => todoItem.completed === true);
    default:
      return todoUsed;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>('all');
  // const [taskText, setTaskText] = useState('');

  const [errorMessage, setErrorMessage] = useState(true);

  // const userId = tadoService.USER_ID;

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

  // const handleTaskText = (task: string) => {
  //   setTaskText(task);
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              // value={taskText}
              // onChange={event => handleTaskText(event.target.value)}
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

      {/* DON'T use conditional rendering to hide the no  tification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        // isHidden={errorMessage !== null}
      />
    </div>
  );
};
