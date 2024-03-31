/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import { NewTodoForm } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import classNames from 'classnames';
import {
  getActiveTodosLength,
  getCompletedTodosLength,
  getfilteredTodos,
} from './utils/getFilterTodos';
import { FILTERS } from './types/FILTERS';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FILTERS.all);
  const [errorMessage, setErrorMessage] = useState('');

  function showErrorMessage(error: string) {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  useEffect(() => {
    if (todosService.USER_ID) {
      todosService
        .getTodos()
        .then(setTodos)
        .catch(() => showErrorMessage('Unable to load todos'));
    }
  }, []);

  function addTodos({ userId, completed, title }: Todo) {
    return todosService
      .createTodos({ userId, completed, title })
      .then(newTodos => {
        setTodos(currentTodos => {
          return [...currentTodos, newTodos];
        });
      })
      .catch(() => {
        showErrorMessage('Unable to add a todo');
      });
  }

  function deleteTodo(todoId: number) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));

    return todosService.deleteTodos(todoId).catch(error => {
      setTodos(todos);
      showErrorMessage('Unable to delete a todo');
      throw error;
    });
  }

  const visibleTodos = getfilteredTodos(todos, filter);

  // function upDateTodo(updatedTodo: Todo) {
  //   return todosService.upDateTodos(updatedTodo).then(todo => {
  //     setTodos(currentTodos => {
  //       const newTodos = [...currentTodos];
  //       const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

  //       newTodos.splice(index, 1, todo);

  //       return newTodos;
  //     });
  //   });
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: getCompletedTodosLength(todos) === todos.length,
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <NewTodoForm
            onSubmit={addTodos}
            userId={todosService.USER_ID}
            onError={showErrorMessage}
          />
        </header>
        {todos.length > 0 && (
          <TodoList todos={visibleTodos} onDelete={deleteTodo} />
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${getActiveTodosLength(todos)} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FILTERS.all)}
              >
                {FILTERS.all}
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FILTERS.active)}
              >
                {FILTERS.active}
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FILTERS.completed)}
              >
                {FILTERS.completed}
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className={classNames('delete')}
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
