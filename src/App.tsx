/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { ErrorMessage } from './types/errors';
import { Todo } from './types/Todo';
import { getTodos, deleteTodos, postTodos, patchTodos } from './api/todos';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [fieldValue, setFieldValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showError = (message: string) => {
    setErrorMessage(message);
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        showError(ErrorMessage.LOAD);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const areAllCompleted = todos.every(todo => todo.completed);
  const activeCount = todos.filter(todo => !todo.completed).length;

  const handleToggleAllButton = async () => {
    try {
      const newStatus = !areAllCompleted;

      const updatePromises = todos.map(todo =>
        patchTodos(todo.id, { completed: newStatus }),
      );

      const updatedTodos = await Promise.all(updatePromises);

      setTodos(updatedTodos);
    } catch (error) {
      showError(ErrorMessage.UPDATE);
    }
  };

  const updateChecked = async (todo: Todo) => {
    try {
      const newStatus = !todo.completed;
      const updateTodo = await patchTodos(todo.id, { completed: newStatus });
      const updatedTodo = todos.map(oldTodo =>
        oldTodo.id === updateTodo.id ? updateTodo : oldTodo,
      );

      setTodos(updatedTodo);
    } catch (error) {
      setErrorMessage(ErrorMessage.UPDATE);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodos(id);
      const deletedTodo = todos.filter(todo => todo.id !== id);

      setTodos(deletedTodo);
    } catch (error) {
      setErrorMessage(ErrorMessage.DELETE);
    }
  };

  const postTodo = async (title: string) => {
    if (title.trim() === '') {
      setErrorMessage(ErrorMessage.EMPTY_TITLE);

      return;
    }

    try {
      const newTask = await postTodos({ title });

      setTodos(currentList => [...currentList, newTask]);
      setFieldValue('');
    } catch (error) {
      setErrorMessage(ErrorMessage.ADD);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    postTodo(fieldValue);
  };

  const changeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);

      await Promise.all(completedTodos.map(todo => deleteTodos(todo.id)));

      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      setErrorMessage(ErrorMessage.DELETE);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${areAllCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={handleToggleAllButton}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              value={fieldValue}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => setFieldValue(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              updateChecked={updateChecked}
              deleteTodo={deleteTodo}
            />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeCount} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => changeFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => changeFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => changeFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => clearCompleted()}
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
        className={`${errorMessage ? '' : 'hidden'} notification is-danger is-light has-text-weight-normal`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
