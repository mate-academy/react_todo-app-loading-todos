/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, createTodos, getTodos, updateTodo } from './api/todos';
import { Todo } from './types/Todo';
enum StatusTodos {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusTodos>(StatusTodos.ALL);

  useEffect(() => {
    getTodos(USER_ID)
    .then(fetchedTodos => {
      setTodos(fetchedTodos)
    })
    .catch(e => {
      setError('Unable to load todos' + e.message);
    });
  }, [])

  useEffect(() => {
    if (error !== null) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      setError('Title is required');
      return;
    }
    setError(null);
    const newTodo: Omit<Todo, 'id'> = {
      title,
      userId: USER_ID,
      completed,
    };

    try {
      const createdTodo = await createTodos(newTodo);
      setTodos(prevTodos => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error('Error creating Todo:', error);
      setError('Failed to create Todo');
    }
    setTitle('');
    setCompleted(false);
  };

  const updateTodoStatus = async (todoId: number, completed: boolean) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      setError('Todo not found');
      return;
     }

    try {
      const updatedTodo = await updateTodo({ ...todoToUpdate, completed });
      setTodos(currentTodos =>
        currentTodos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      );
    } catch (e) {
      console.error('Unable to update todo:', e);
      setError('Unable to update a todo: ' + e);
    }
  };

    const handleStatusChange = (newStatus: StatusTodos ) => {
      setStatus(newStatus);
  }  ;

  const statusTodos = todos.filter(todo => {
    switch(status){
      case StatusTodos.ACTIVE:
        return !todo.completed;
      case StatusTodos.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  })

  if (!USER_ID) {
    return <UserWarning />;
  }

  const counterOfActiveTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
             <button type="submit">Add Todo</button>
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {statusTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => updateTodoStatus(todo.id, !todo.completed)}
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 ? (
          <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
          {`${counterOfActiveTodos} items left`}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${status === StatusTodos.ALL ? 'selected' : ''}`}
              onClick={() => handleStatusChange(StatusTodos.ALL)}
              data-cy="FilterLinkAll"
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${status === StatusTodos.ACTIVE ? 'selected' : ''}`}
              onClick={() => handleStatusChange(StatusTodos.ACTIVE)}
              data-cy="FilterLinkActive"
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${status === StatusTodos.COMPLETED ? 'selected' : ''}`}
              onClick={() => handleStatusChange(StatusTodos.COMPLETED)}
              data-cy="FilterLinkCompleted"
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!todos.some(todo => todo.completed === true)}
          >
            Clear completed
          </button>
        </footer>
        ) : null}

      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
        <div data-cy="ErrorNotification" className={`notification is-danger is-light has-text-weight-normal ${error ===
          null ? 'hidden': ''}`}>
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {error}
        </div>
    </div>
  );
}
