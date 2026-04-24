/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, saveTodo, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/todoList';
import { Todo } from './types/Todo';

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const strategy: Record<Filter, (todo: Todo) => boolean> = {
  [Filter.ALL]: () => true,
  [Filter.ACTIVE]: todo => !todo.completed,
  [Filter.COMPLETED]: todo => todo.completed,
};

enum ErrorType {
  NON,
  LOADING,
  EMPTY_TITLE,
  ADDING,
  DELETING,
  UPDATING,
}

const errorMsg: Record<ErrorType, string> = {
  [ErrorType.NON]: '',
  [ErrorType.LOADING]: 'Unable to load todos',
  [ErrorType.EMPTY_TITLE]: 'Title should not be empty',
  [ErrorType.ADDING]: 'Unable to add a todo',
  [ErrorType.DELETING]: 'Unable to delete a todo',
  [ErrorType.UPDATING]: 'Unable to update a todo',
};

const isFilter = (value: string): value is Filter => {
  return Object.values(Filter).includes(value as Filter);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [, setIsLoaded] = useState(false);
  const [newTodoRequest, setNewTodoRequest] = useState<string>('');
  const [filter, setFilter] = useState(Filter.ALL);
  const [error, setError] = useState(ErrorType.NON);
  const [loadedTodosIds, setLoadedTodosIds] = useState<Set<number>>(new Set());

  const todosToDo: number = todos.filter(strategy[Filter.ACTIVE]).length;
  const todosCompleted: number = todos.filter(
    strategy[Filter.COMPLETED],
  ).length;

  const loadTodos = async () => {
    const todosList = await getTodos();

    setLoadedTodosIds(new Set(todosList.map(todo => todo.id)));

    return todosList;
  };

  const applyTodos = (data: Todo[]) => {
    setTodos(data);
  };

  const clearInput = () => {
    setNewTodoRequest('');
  };

  const createTodo = (todoTitle: string) => {
    return saveTodo({
      userId: USER_ID,
      title: todoTitle,
      completed: false,
    });
  };

  useEffect(() => {
    setError(ErrorType.NON);

    loadTodos()
      .then(applyTodos)
      .catch(() => setError(ErrorType.LOADING))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (error === ErrorType.NON) {
      return;
    }

    const timer = setTimeout(() => {
      setError(ErrorType.NON);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleNewTodoRequest = (input: string) => {
    setNewTodoRequest(input);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setError(ErrorType.NON);
    setIsLoaded(false);

    if (!newTodoRequest.trim()) {
      setError(ErrorType.EMPTY_TITLE);

      return;
    }

    createTodo(newTodoRequest)
      .catch(() => {
        setError(ErrorType.ADDING);
      })
      .then(loadTodos)
      .then(data => {
        applyTodos(data);
        clearInput();
      })
      .catch(() => {
        setError(ErrorType.LOADING);
      })
      .finally(() => setIsLoaded(true));
  };

  const todosToPresent = todos.filter(strategy[filter]);

  const handleFilterChoice = (value: string) => {
    if (isFilter(value)) {
      setFilter(value);
    }
  };

  const handleErrorExit = () => {
    setError(ErrorType.NON);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={
              'todoapp__toggle-all' +
              (todosToDo === 0 ? ' active' : '') +
              (todos.length === 0 ? ' hidden' : '')
            }
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoRequest}
              onChange={input => handleNewTodoRequest(input.target.value)}
            />
          </form>
        </header>

        <TodoList todoList={todosToPresent} loadedTodosIds={loadedTodosIds} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 ? (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todosToDo === 1 ? '1 item left' : `${todosToDo} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={
                  'filter__link' + (filter === Filter.ALL ? ' selected' : '')
                }
                data-cy="FilterLinkAll"
                onClick={choise => {
                  choise.preventDefault();
                  handleFilterChoice('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  'filter__link' + (filter === Filter.ACTIVE ? ' selected' : '')
                }
                data-cy="FilterLinkActive"
                onClick={choise => {
                  choise.preventDefault();
                  handleFilterChoice('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  'filter__link' +
                  (filter === Filter.COMPLETED ? ' selected' : '')
                }
                data-cy="FilterLinkCompleted"
                onClick={choise => {
                  choise.preventDefault();
                  handleFilterChoice('completed');
                }}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className={
                'todoapp__clear-completed' +
                (todosCompleted === 0 ? ' disabled' : '')
              }
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        ) : (
          ''
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          'notification is-danger is-light has-text-weight-normal' +
          (error === ErrorType.NON ? ' hidden' : '')
        }
      >
        {errorMsg[error]}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorExit}
        />
        {/* show only one message at a time */}
      </div>
    </div>
  );
};
