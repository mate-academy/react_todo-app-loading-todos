/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import classNames from 'classnames';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const hasCompleted = todos.some(todo => todo.completed);
  const completedTodos =
    todos.length > 0 && todos.every(todo => todo.completed);

  const countOfTodos = todos.filter(todo => todo.completed === false).length;

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleToggleButton = async () => {
    const doesCompleteAll = !todos.every(todo => todo.completed);

    try {
      await Promise.all(
        todos.map(todo => updateTodo(todo.id, { completed: doesCompleteAll })),
      );
      setTodos(prev =>
        prev.map(todo => ({
          ...todo,
          completed: doesCompleteAll,
        })),
      );
    } catch {
      setErrorMessage('Unable to update todos');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const toggleTodo = async (id: number) => {
    const todoToToggle = todos.find(todo => todo.id === id);

    if (!todoToToggle) {
      return;
    }

    setErrorMessage(null);

    try {
      setLoadingId(id);

      const updatedTodo = await updateTodo(id, {
        completed: !todoToToggle.completed,
      });

      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch {
      setErrorMessage('Unable to update a todo');
    } finally {
      setLoadingId(null);
    }
  };

  const handleFilterChange = (type: Filter) => {
    setFilter(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setErrorMessage(null);
    e.preventDefault();
    if (!value.trim()) {
      return;
    }

    try {
      const newTodo = await createTodo({
        userId: USER_ID,
        title: value,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
      setValue('');
    } catch (error) {
      setErrorMessage('Unable to add a todo');
    }
  };

  const handleUpdate = (updatedTodo: Todo) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  const handleRemoveButton = async (id: number) => {
    try {
      setLoadingId(id);
      await deleteTodo(id);

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setErrorMessage('Unable to delete a todo');
    }
  };

  const handleClearCompleted = async () => {
    const allCompletedTodos = todos.filter(todo => todo.completed);

    try {
      await Promise.all(allCompletedTodos.map(todo => deleteTodo(todo.id)));

      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch {
      setErrorMessage('Unable to delete a todo');
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: completedTodos,
            })}
            onClick={() => handleToggleButton()}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              onUpdate={handleUpdate}
              setErrorMessage={setErrorMessage}
              handleRemoveButton={handleRemoveButton}
              setLoadingId={setLoadingId}
              loadingId={loadingId}
            />

            <Footer
              onFilterChange={handleFilterChange}
              hasCompleted={hasCompleted}
              handleClearCompleted={handleClearCompleted}
              countOfTodos={countOfTodos}
              filter={filter}
            />
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
          onClick={() => setErrorMessage(null)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
