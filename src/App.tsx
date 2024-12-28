/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FormEvent, useEffect, useState } from 'react';
import { USER_ID, getTodos, postTodo, updateTodo } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { ErrorMessage } from './componens/errorMessage';

export enum FilterType {
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<FilterType | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = () => {
      getTodos()
        .then(todosList => {
          setTodos(todosList);
        })
        .catch(() => {
          setErrorMessage('Unable to load todos');
          setTimeout(() => setErrorMessage(''), 3000);
        });
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(tod => {
    if (filter === FilterType.Active) {
      return !tod.completed;
    }

    if (filter === FilterType.Completed) {
      return tod.completed;
    }

    return true;
  });

  const isCompleted =
    todos.filter(tod => !tod.completed).length === todos.length;

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo.trim()) {
      setErrorMessage('Title should not be empty');

      setTimeout(() => setErrorMessage(''), 3000);

      return;
    }

    setIsLoading(true);

    postTodo({
      userId: USER_ID,
      title: todo,
      completed: false,
    })
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setTodo('');
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setIsLoading(false); // Вимкнути стан додавання
      });
  };

  const deleteTodoHandler = (todoId: number) => {
    setLoadingTodoId(todoId);
    client
      .delete(`/todos/${todoId}`)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId));
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleDoubleClick = (todoItem: Todo) => {
    setNewTitle(todoItem.title);
    setEditingId(todoItem.id);
  };

  const handleBlur = (todoItem: Todo) => {
    setEditingId(null);

    updateTodo({
      id: todoItem.id,
      completed: todoItem.completed,
      userId: todoItem.userId,
      title: newTitle,
    })
      .then(updatedTodo => {
        setTodos(prevTodos =>
          prevTodos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoItem: Todo,
  ) => {
    if (e.key === 'Enter') {
      handleBlur(todoItem);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const updateCompleted = (todoItem: Todo) => {
    setLoadingTodoId(todoItem.id);
    updateTodo({
      id: todoItem.id,
      completed: !todoItem.completed,
      userId: todoItem.userId,
      title: todoItem.title,
    })
      .then(updatedTodo => {
        setTodos(prevTodos =>
          prevTodos.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
        );
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setLoadingTodoId(null); // Зняти стан завантаження
      });
  };

  const ClearCompleted = () => {
    const completedTodos = todos.filter(tod => tod.completed);

    Promise.all(completedTodos.map(tod => deleteTodoHandler(tod.id)));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={addTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todo}
              onChange={e => setTodo(e.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todoItem => (
            <div
              data-cy="Todo"
              className={`todo ${todoItem.completed ? 'completed' : ''}`}
              key={todoItem.id}
              style={{
                opacity:
                  isLoading && todoItem.id === todos[todos.length - 1]?.id
                    ? 0.5
                    : 1, // Прозорість для нового елемента
              }}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todoItem.completed}
                  onChange={() => updateCompleted(todoItem)}
                />
              </label>

              {editingId === todoItem.id ? (
                <input
                  data-cy="TodoEditInput"
                  type="text"
                  className="todo__edit"
                  value={newTitle}
                  onChange={handleChange}
                  onBlur={() => handleBlur(todoItem)}
                  onKeyDown={e => handleKeyDown(e, todoItem)}
                  autoFocus
                />
              ) : (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(todoItem)}
                  style={{
                    opacity: loadingTodoId === todoItem.id ? 0.5 : 1,
                  }}
                >
                  {todoItem.title}
                </span>
              )}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTodoHandler(todoItem.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(tod => !tod.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === null ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(null)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === FilterType.Active ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FilterType.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === FilterType.Completed ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FilterType.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={ClearCompleted}
              disabled={isCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
