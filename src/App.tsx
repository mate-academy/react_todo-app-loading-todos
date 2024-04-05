/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { Todo } from './types/Todo';
import { createTodo, deleteTodo, getTodos, updateTodo } from './api/todos';
import classNames from 'classnames';
import { TodoItem } from './TodoItem';

enum FilterStatus {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [status, setStatus] = React.useState(FilterStatus.all);
  const [tempTodo, setTempTodo] = React.useState<Todo | null>(null);
  const [processingIds, setProcessingIds] = React.useState<number[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [title, setTitle] = React.useState('');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerID = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerID);
  }, [errorMessage]);

  useEffect(() => {
    if (!tempTodo) {
      inputRef.current?.focus();
    }
  }, [tempTodo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setTempTodo({
      id: 0,
      title: normalizedTitle,
      completed: false,
      userId: 0,
    });

    setErrorMessage('');

    createTodo(normalizedTitle)
      .then(todo => {
        setTodos((prevTodos: Todo[]) => [...prevTodos, todo]);
        setTitle('');
      })
      .catch(() => setErrorMessage('Unable to add a todo'))
      .finally(() => setTempTodo(null));
  };

  const toggleTodo = (todoToUpdate: Todo) => {
    setErrorMessage('');
    setProcessingIds(prevIds => [...prevIds, todoToUpdate.id]);

    updateTodo({ ...todoToUpdate, completed: !todoToUpdate.completed })
      .then(updatedTodo => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === todoToUpdate.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(() => setErrorMessage('Unable to update a todo'))
      .finally(() =>
        setProcessingIds(prevIds =>
          prevIds.filter(id => id !== todoToUpdate.id),
        ),
      );
  };

  const toggleAll = () => {
    if (activeTodos.length !== 0) {
      activeTodos.forEach(todo => toggleTodo(todo));
    } else {
      completedTodos.forEach(todo => toggleTodo(todo));
    }
  };

  const renameTodo = (todoToRename: Todo, newTitle: string) => {
    setErrorMessage('');
    setProcessingIds(prevIds => [...prevIds, todoToRename.id]);

    return updateTodo({
      ...todoToRename,
      title: newTitle,
    })
      .then(updatedTodo => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.id === todoToRename.id ? updatedTodo : todo,
          ),
        );

        inputRef.current?.focus();
      })
      .catch(error => {
        setErrorMessage('Unable to update a todo');
        throw error;
      })
      .finally(() =>
        setProcessingIds(prevIds =>
          prevIds.filter(id => id !== todoToRename.id),
        ),
      );
  };

  const handleDeletingTodo = (todoIdToDelete: number) => {
    setErrorMessage('');
    setProcessingIds(prevIds => [...prevIds, todoIdToDelete]);

    deleteTodo(todoIdToDelete)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.filter(todo => todo.id !== todoIdToDelete),
        );
      })
      .catch(() => setErrorMessage('Unable to delete a todo'))
      .finally(() => {
        setProcessingIds(prevIds =>
          prevIds.filter(id => id !== todoIdToDelete),
        );
        inputRef.current?.focus();
      });
  };

  const handleClearCompletedTodos = () => {
    completedTodos.forEach(todo => handleDeletingTodo(todo.id));
  };

  let visibleTodos = todos;

  if (status === FilterStatus.active) {
    visibleTodos = activeTodos;
  } else if (status === FilterStatus.completed) {
    visibleTodos = completedTodos;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: activeTodos.length === 0,
              })}
              onClick={toggleAll}
            />
          )}
          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
              ref={inputRef}
              disabled={tempTodo !== null}
            />
          </form>
        </header>

        {todos.length === 0 ? null : (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={() => handleDeletingTodo(todo.id)}
                  onToggle={() => toggleTodo(todo)}
                  onRename={newTitle => renameTodo(todo, newTitle)}
                  loading={processingIds.includes(todo.id)}
                />
              ))}

              {tempTodo && <TodoItem todo={tempTodo} loading={true} />}
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodos.length} items left`}
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  data-cy="FilterLinkAll"
                  className={classNames('filter__link', {
                    selected: status === FilterStatus.all,
                  })}
                  onClick={() => setStatus(FilterStatus.all)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  data-cy="FilterLinkActive"
                  className={classNames('filter__link', {
                    selected: status === FilterStatus.active,
                  })}
                  onClick={() => setStatus(FilterStatus.active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  data-cy="FilterLinkCompleted"
                  className={classNames('filter__link', {
                    selected: status === FilterStatus.completed,
                  })}
                  onClick={() => setStatus(FilterStatus.completed)}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={completedTodos.length === 0}
                onClick={handleClearCompletedTodos}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};

// Unable to load todos
// <br />
// Title should not be empty
// <br />
// Unable to add a todo
// <br />
// Unable to delete a todo
// <br />
// Unable to update a todo
