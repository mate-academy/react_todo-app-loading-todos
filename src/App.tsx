import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import {
  addTodo, deleteTodo, getTodos, updateTodoStatus,
} from './api/todos';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

import { UserWarning } from './UserWarning';
import { TodoEditForm } from './Components/TodoEdit';

const USER_ID = 10;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState(Status.ALL);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleEditTodo = (todoId: number) => {
    setEditingTodoId((prevTodoId) => (prevTodoId === todoId ? null : todoId));
  };

  const handleSaveTodo = (editedTodo: { id: number; title: string; }) => {
    updateTodoStatus(editedTodo.id, { title: editedTodo.title })
      .then(() => {
        setTodos(
          (prevTodos) => prevTodos.map((todo) => (todo.id === editedTodo.id
            ? { ...todo, title: editedTodo.title } : todo)),
        );
      })
      .catch((error) => {
        setHasError(true);
        // eslint-disable-next-line no-console
        console.error('Failed to update todo:', error);
      });

    setEditingTodoId(null);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .catch((error: Error) => {
        setHasError(true);
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (hasError) {
      const timeout = setTimeout(() => {
        setHasError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return () => { };
  }, [hasError]);

  const handleCheckboxChange = (todoId: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find((todo) => todo.id === todoId);

    if (todoToUpdate) {
      client.patch(`/todos/${todoId}`, { completed: todoToUpdate.completed })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Failed to update todo status:', error);
          setTodos(prevTodos => prevTodos.map(
            todo => (todo.id === todoId
              ? { ...todo, completed: !todo.completed } : todo),
          ));
        });
    }
  };

  const handleAddTodo = (title: string) => {
    const newTodo: Omit<Todo, 'id'> = {
      title,
      completed: false,
      userId: USER_ID,
    };

    addTodo(USER_ID, newTodo)
      .then((addedTodo) => {
        setTodos((prevTodos) => [...prevTodos, addedTodo]);
      })
      .catch((error: Error) => {
        setHasError(true);
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      })
      .catch((error: Error) => {
        setHasError(true);
        // eslint-disable-next-line no-console
        console.error(error.message);
      });
  };

  const handleClearCompleted = () => {
    const uncompletedTodos = todos.filter((todo) => !todo.completed);

    setTodos(uncompletedTodos);

    const completedTodoIds = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);

    completedTodoIds.forEach((todoId) => {
      client.delete(`/todos/${todoId}`)
        .catch((error: Error) => {
          setHasError(true);
          // eslint-disable-next-line no-console
          console.error(error.message);
        });
    });
  };

  const [completedTodos, uncompletedTodos] = useMemo(() => {
    const completed = todos?.filter((todo) => todo.completed);
    const uncompleted = todos?.filter((todo) => !todo.completed);

    return [completed, uncompleted];
  }, [todos]);

  const todoIsActive = todos?.find((todo) => todo.completed === false);

  const visibleTodos = useMemo(() => {
    switch (filterStatus) {
      case Status.COMPLETED:
        return completedTodos;

      case Status.ACTIVE:
        return uncompletedTodos;

      case Status.ALL:
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todoIsActive && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button type="button" className="todoapp__toggle-all active" />
          )}
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const form = event.target as HTMLFormElement;
              const newTodoTitle = form.newTodoTitle.value.trim();

              if (newTodoTitle) {
                handleAddTodo(newTodoTitle);
                form.reset();
              }
            }}
          >
            <input
              type="text"
              name="newTodoTitle"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {visibleTodos?.map((todo: Todo) => (
            <div
              key={todo.id}
              className={cn('todo', {
                completed: todo?.completed,
              })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo?.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
              </label>
              {editingTodoId === todo.id ? (
                <TodoEditForm
                  todo={todo}
                  onEdit={handleSaveTodo}
                />
              ) : (
                <span
                  className="todo__title"
                  onDoubleClick={() => handleEditTodo(todo.id)}
                >
                  {todo?.title}
                </span>
              )}
              <button
                type="button"
                className="todo__remove"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ×
              </button>
              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
        {todos?.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">{`${uncompletedTodos?.length} items left`}</span>

            <nav className="filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterStatus === Status.ALL,
                })}
                onClick={() => setFilterStatus(Status.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterStatus === Status.ACTIVE,
                })}
                onClick={() => setFilterStatus(Status.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterStatus === Status.COMPLETED,
                })}
                onClick={() => setFilterStatus(Status.COMPLETED)}
              >
                Completed
              </a>
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              style={{
                opacity: completedTodos.length > 0 ? '1' : '0',
                pointerEvents: completedTodos.length > 0 ? 'auto' : 'none',
              }}
              disabled={!completedTodos?.length}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !hasError,
          },
        )}
      >
        {
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            className="delete"
            onClick={() => setHasError(false)}
          />
        }
        Unable to load todos
      </div>
    </div>
  );
};
