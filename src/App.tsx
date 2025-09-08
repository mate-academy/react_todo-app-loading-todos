/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { TodoRow } from './components/TodoRow';
import { WarningError } from './components/WarningError';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('');

  function showError(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  useEffect(() => {
    todoService
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        showError('Unable to load todos');
        throw error;
      });
  }, []);

  const deleteTodo = (todoId: number) => {
    return todoService
      .deleteTodo(todoId)
      .then(() =>
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        ),
      )
      .catch(error => {
        showError('Unable to delete a todo');
        throw error;
      });
  };

  const renameTodo = (todoToUpdate: Todo, newTitle: string) => {
    return todoService
      .updateTodo({ ...todoToUpdate, title: newTitle })
      .then(updatedTodo =>
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        ),
      )
      .catch(error => {
        showError('Unable to update a todo');
        throw error;
      });
  };

  const toggleTodo = (todoToUpdate: Todo) => {
    return todoService
      .updateTodo({
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      })
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
      })
      .catch(error => {
        showError('Unable to toggle a todo');
        throw error;
      });
  };

  const createTodo = (newTitle: string) => {
    return todoService
      .createTodo(newTitle)
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch(error => {
        showError('Unable to add a todo');
        throw error;
      });
  };

  const handleCreateTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    if (title.trim() === '') {
      showError('Title should not be empty');

      return;
    }

    createTodo(title.trim());
    setTitle('');
  };

  function filterTodos(array: Todo[]): Todo[] {
    switch (filter) {
      case 'active':
        return array.filter(todo => !todo.completed);
      case 'completed':
        return array.filter(todo => todo.completed);
      default:
        return array;
    }
  }

  const handleFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const value = event.currentTarget.getAttribute('href')?.slice(2) || '';

    setFilter(value);
  };

  const handleDeleteAllCompletedTodos = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const completedTodos = todos.filter(todo => todo.completed);

    try {
      await Promise.all(
        completedTodos.map(todo => todoService.deleteTodo(todo.id!)),
      );

      setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    } catch (error) {
      showError('Unable to delete completed todos');
      throw error;
    }
  };

  const toggleAllTodos = async () => {
    const allCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);

    try {
      await Promise.all(updatedTodos.map(todo => todoService.updateTodo(todo)));
    } catch (error) {
      showError('Unable to toggle all todos');
      todoService.getTodos().then(setTodos);
    }
  };

  const filteredTodos = filterTodos(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: todos.length > 0 && todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAllTodos}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={e => e.preventDefault()}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
              onKeyDown={handleCreateTodo}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => {
            return (
              <TodoRow
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo(todo.id)}
                onRename={(newTitle: string) => renameTodo(todo, newTitle)}
                onToggleTodo={() => toggleTodo(todo)}
              />
            );
          })}

          {/* This todo is in loadind state */}
          {/* <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

          {/* 'is-active' class puts this modal on top of the todo */}
          {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', { selected: filter === '' })}
                data-cy="FilterLinkAll"
                onClick={handleFilter}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={handleFilter}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={handleFilter}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleDeleteAllCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <WarningError
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
