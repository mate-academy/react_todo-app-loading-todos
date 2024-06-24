import { useTodoTodos } from './Context';
import { ErrorNotification } from './ErrorNotification';
import { Filter } from './Filter';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';
import classNames from 'classnames';
import React from 'react';

export const TodoApp = React.memo(() => {
  const todos = useTodoTodos();

  const amountOfLeftTodos = todos.reduce(
    (amount, todo) => (todo.completed ? amount : amount + 1),
    0,
  );

  const isEveryTodoCompleted = todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: isEveryTodoCompleted,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <NewTodo />
        </header>

        {!!todos.length && (
          <>
            <TodoList />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {amountOfLeftTodos} items left
              </span>

              <Filter />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification />
    </div>
  );
});

TodoApp.displayName = 'TodoApp';
