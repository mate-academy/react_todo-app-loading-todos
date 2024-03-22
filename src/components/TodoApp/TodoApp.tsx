import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { getTodos } from '../../api/todos';
import { Errors } from '../../types/Errors';

export const TodoApp: React.FC = () => {
  const { todos, setTodos, errorMessage, setErrorMassage } =
    useContext(TodosContext);

  const todoInput = useRef<HTMLInputElement | null>(null);
  const isCompletedInTodos = todos.some(todo => todo.completed);
  const totalIncomplete = todos.reduce(
    (acc, curr) => (!curr.completed ? acc + 1 : acc),
    0,
  );

  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.focus();
    }

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMassage(Errors.loadTodos);
        setTimeout(() => {
          setErrorMassage(Errors.noErrors);
        }, 3000);
      });
  }, [setTodos, setErrorMassage]);

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
              ref={todoInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length !== 0 && (
          <>
            <TodoList />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${totalIncomplete} items left`}
              </span>

              <TodosFilter />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!isCompletedInTodos}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage.length },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMassage(Errors.noErrors)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
