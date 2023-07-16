/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { TodoStatus } from './utils/types';
import { getTodos } from './api/todos';

const USER_ID = 10831;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TodoStatus>(TodoStatus.All);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await getTodos(USER_ID);

        setTodos(result);
      } catch (errors) {
        setError('Unable to fetch todos.');
      }
    };

    fetchTodos();
  }, []);

  const handleFormSubmit = async (event:
  FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const isEmpty = newTodo.trim() === '';

    if (isEmpty) {
      return;
    }

    const newTodoItem: Todo = {
      id: todos.length + 1,
      userId: USER_ID || 0,
      title: newTodo.trim(),
      completed: false,
    };

    try {
      await client.post(`/todos?userId=${USER_ID}`, newTodoItem);

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    } catch (errors) {
      setError('Unable to add a todo.');
    }
  };

  const handleTodoToggle = async (event:
  ChangeEvent<HTMLInputElement>, todoId: number): Promise<void> => {
    const isChecked = event.target.checked;

    try {
      await client.patch(`/todos/${todoId}`, { completed: isChecked });

      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, completed: isChecked };
          }

          return todo;
        });

        return updatedTodos;
      });
    } catch (errors) {
      setError('Unable to update a todo.');
    }
  };

  const handleTodoDelete = async (todoId: number): Promise<void> => {
    try {
      await client.delete(`/todos/${todoId}`);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (errors) {
      setError('Unable to delete a todo.');
    }
  };

  const handleStatusFilterChange = (status: TodoStatus): void => {
    setStatusFilter(status);
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter((todo) => {
    switch (statusFilter) {
      case TodoStatus.Active:
        return !todo.completed;
      case TodoStatus.Completed:
        return todo.completed;
      case TodoStatus.All:
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(event:
              ChangeEvent<HTMLInputElement>) => setNewTodo(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map((todo) => (
            <div
              className={classNames('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={(event) => handleTodoToggle(event, todo.id)}
                />
              </label>
              <span className="todo__title">{todo.title}</span>
              <button
                type="button"
                className="todo__remove"
                onClick={() => handleTodoDelete(todo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        <footer className="todoapp__footer">
          <nav className="filter">
            <a
              href="#/"
              className={classNames('filter__link',
                { selected: statusFilter === TodoStatus.All })}
              onClick={() => handleStatusFilterChange(TodoStatus.All)}
            >
              All
            </a>
            <a
              href="#/active"
              className={classNames('filter__link',
                { selected: statusFilter === TodoStatus.Active })}
              onClick={() => handleStatusFilterChange(TodoStatus.Active)}
            >
              Active
            </a>
            <a
              href="#/completed"
              className={classNames('filter__link',
                { selected: statusFilter === TodoStatus.Completed })}
              onClick={() => handleStatusFilterChange(TodoStatus.Completed)}
            >
              Completed
            </a>
          </nav>

          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setError(null)}
          />
          {error}
        </div>
      )}
    </div>
  );
};
