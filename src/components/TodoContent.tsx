import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import {
  deleteSelectedTodo,
  getTodos,
  postTodo,
  updateTodo,
  USER_ID,
} from '../api/todos';
import { Errors } from '../types/Errors';
import classNames from 'classnames';
import { FilterBy } from '../types/FilterBy';

export const TodoContent: React.FC = () => {
  const [todoValue, setTodoValue] = useState<string>('');
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadingTodo, setLoadingTodo] = useState<Todo | null>(null);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [isAllcompleted, setIsAllCompleted] = useState<boolean>(false);
  const [anyLoading, setAnyLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<FilterBy>(FilterBy.all);
  const [complTodoDeleteLoading, setComplTodoDeleteLoading] = useState<Todo[]>(
    [],
  );

  function filterTodosByStatus(): Todo[] {
    const filterActions = {
      [FilterBy.active]: todosFromServer.filter(todo => !todo.completed),
      [FilterBy.completed]: completedTodos,
      [FilterBy.all]: todosFromServer,
    };

    return filterActions[filterStatus] || todosFromServer;
  }

  function resetErrorMessage(): void {
    setErrorMessage('');
  }

  function handleClearCompleted() {
    completedTodos.map(compTodo => {
      setComplTodoDeleteLoading(prev => [...prev, compTodo]);
      deleteSelectedTodo(compTodo)
        .then(() => getTodos())
        .then(setTodosFromServer)
        .catch(() => setErrorMessage(Errors.notDelete))
        .finally(() => setComplTodoDeleteLoading([]));
    });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoValue(event.target.value);

    if (todoValue !== '') {
      resetErrorMessage();
    }
  }

  function handleUpdateTodos(todoses: Todo[]) {
    setTodosFromServer(todoses);
  }

  function handleErrorMessage(error: Errors | '') {
    setErrorMessage(error);
  }

  function handleAllButtonClick() {
    todosFromServer.map(todo => {
      setAnyLoading(true);
      const updatedTodo: Todo = {
        ...todo,
        completed: isAllcompleted ? false : true,
      };

      updateTodo(updatedTodo)
        .then(() => getTodos())
        .then(setTodosFromServer)
        .catch(() => setErrorMessage(Errors.notUpdate))
        .finally(() => setAnyLoading(false));
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (todoValue.trim() === '') {
      setErrorMessage(Errors.notEmpty);
      setTimeout(resetErrorMessage, 3000);

      return;
    }

    const preparedTodo = {
      userId: USER_ID,
      title: todoValue,
      completed: false,
    };

    const currentTodos = todosFromServer;

    setTodosFromServer(curTodos => [...curTodos, preparedTodo]);

    postTodo(preparedTodo)
      .then(getTodos)
      .then(data => setTodosFromServer(data))
      .then(() => setTodoValue(''))
      .catch(() => {
        setTodosFromServer(currentTodos);
        setErrorMessage(Errors.notAdd);
        setTimeout(resetErrorMessage, 3000);
      })
      .finally(() => setLoadingTodo(null));
  }

  function setLoadingValue(todo: Todo | null) {
    setLoadingTodo(todo);
  }

  useEffect(() => {
    getTodos()
      .then(data => {
        setErrorMessage('');
        setTodosFromServer(data);
      })
      .catch(() => {
        setErrorMessage(Errors.notLoad);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  useEffect(() => {
    if (todosFromServer.every(todo => todo.completed)) {
      setIsAllCompleted(true);
    } else {
      setIsAllCompleted(false);
    }

    setCompletedTodos([...todosFromServer].filter(todo => todo.completed));
  }, [todosFromServer]);

  return (
    <>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: isAllcompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={handleAllButtonClick}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              value={todoValue}
              onChange={handleInputChange}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList
          todos={filterTodosByStatus()}
          completedTodos={completedTodos}
          loadingTodo={loadingTodo}
          anyLoading={anyLoading}
          clearCompleteLoading={complTodoDeleteLoading}
          setTodos={handleUpdateTodos}
          setErrorMessage={handleErrorMessage}
          resetError={resetErrorMessage}
          setLoadingTodo={setLoadingValue}
        />

        {todosFromServer.length ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosFromServer.length - completedTodos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterStatus === FilterBy.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilterStatus(FilterBy.all);
                }}
              >
                {FilterBy.all}
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterStatus === FilterBy.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setFilterStatus(FilterBy.active);
                }}
              >
                {FilterBy.active}
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterStatus === FilterBy.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setFilterStatus(FilterBy.completed);
                }}
              >
                {FilterBy.completed}
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            {completedTodos.length !== 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        ) : null}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: errorMessage === '',
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage === Errors.notLoad && Errors.notLoad}
        {errorMessage === Errors.notEmpty && Errors.notEmpty}
        {errorMessage === Errors.notAdd && Errors.notAdd}
        {errorMessage === Errors.notDelete && Errors.notDelete}
        {errorMessage === Errors.notUpdate && Errors.notUpdate}
      </div>
    </>
  );
};
