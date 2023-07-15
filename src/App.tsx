/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { UserWarning } from './UserWarning';
import { client } from './utils/fetchClient';

enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const USER_ID = 10831;

export const App: React.FC = () => {
  // const [userId, setUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TodoStatus>(TodoStatus.All);

  // useEffect(() => {
  //   const registerUserByEmail = async () => {
  //     try {
  //       const response = await fetch('https://mate.academy.github.io/react_student-registration/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email: 'your-email@example.com' }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to register user');
  //       }

  //       const data = await response.json();

  //       setUserId(data.userId);
  //     } catch (error) {
  //       console.error('Error registering user:', error);
  //     }
  //   };

  //   registerUserByEmail();
  // }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

        setTodos(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>):
  Promise<void> => {
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating todo:', error);
    }
  };

  // eslint-disable-next-line max-len
  const handleTodoToggle = async (event: ChangeEvent<HTMLInputElement>, todoId: number): Promise<void> => {
    const isChecked = event.target.checked;

    try {
      await client.patch(`/todos/${todoId}`, { completed: isChecked });

      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) => {
          const isModifiedTodo = todo.id === todoId;
          const modifiedTodo = { ...todo, completed: isChecked };
          const notModifiedTodo = todo;

          if (isModifiedTodo) {
            return modifiedTodo;
          }

          return notModifiedTodo;
        });

        return updatedTodos;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating todo:', error);
    }
  };

  const handleTodoDelete = async (todoId: number): Promise<void> => {
    try {
      await client.delete(`/todos/${todoId}`);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting todo:', error);
    }
  };

  const handleStatusFilterChange = (status: TodoStatus): void => {
    setStatusFilter(status);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(event:
              ChangeEvent<HTMLInputElement>) => setNewTodo(
                event.target.value,
              )}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos
            .filter((todo) => {
              if (statusFilter === TodoStatus.All) {
                return true;
              }

              if (statusFilter === TodoStatus.Active) {
                return !todo.completed;
              }

              if (statusFilter === TodoStatus.Completed) {
                return todo.completed;
              }

              return false;
            })
            .map((todo) => (
              <div className={`todo ${todo.completed ? 'completed' : ''}`} key={todo.id}>
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
          <span className="todo-count">3 items left</span>

          <nav className="filter">
            <a
              href="#/"
              className={`filter__link ${statusFilter === TodoStatus.All ? 'selected' : ''}`}
              onClick={() => handleStatusFilterChange(TodoStatus.All)}
            >
              All
            </a>
            <a
              href="#/active"
              className={`filter__link ${statusFilter === TodoStatus.Active ? 'selected' : ''}`}
              onClick={() => handleStatusFilterChange(TodoStatus.Active)}
            >
              Active
            </a>
            <a
              href="#/completed"
              className={`filter__link ${
                statusFilter === TodoStatus.Completed ? 'selected' : ''
              }`}
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
    </div>
  );
};
