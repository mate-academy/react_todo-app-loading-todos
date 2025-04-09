/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  createTodos,
  deleteTodos,
  getTodos,
  updateTodos,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoComponent } from './components/TodoComponent';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');
  const [loadingErrorMessage, setLoadingErrorMessage] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(error => {
        setLoadingErrorMessage('Unable to load todos');
        throw error;
      });

    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (
      titleErrorMessage ||
      addErrorMessage ||
      updateErrorMessage ||
      loadingErrorMessage
    ) {
      timer = setTimeout(() => {
        setTitleErrorMessage('');
        setAddErrorMessage('');
        setUpdateErrorMessage('');
        setLoadingErrorMessage('');
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [
    titleErrorMessage,
    addErrorMessage,
    updateErrorMessage,
    loadingErrorMessage,
  ]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function addTodo({
    title,
    completed,
  }: {
    title: string;
    completed: boolean;
  }) {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        userId: USER_ID,
        title,
        completed,
        loading: true,
        id: Date.now() + Math.random(),
      },
    ]);
    createTodos({ userId: USER_ID, title, completed })
      .then(newTodo => {
        setTodos(currentTodos =>
          currentTodos.map((todo, index) => {
            if (currentTodos.length - 1 === index) {
              return newTodo;
            }

            return todo;
          }),
        );
        setTodoTitle('');
      })
      .catch(error => {
        setAddErrorMessage('Unable to add a todo');
        setTodos(currentTodos => {
          const currentTodosCopy = [...currentTodos];

          currentTodosCopy.pop();

          return currentTodosCopy;
        });
        throw error;
      });
  }

  function removeTodo(todoId: number) {
    deleteTodos(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(error => {
        setAddErrorMessage('Unable to delete a todo');
        throw error;
      });
  }

  function updateTodo(todoId: number) {
    const todoToUpdate = todos.find(todo => todo.id === todoId);

    if (!todoToUpdate) {
      return;
    }

    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };

    updateTodos(updatedTodo)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo => (todoId === todo.id ? updatedTodo : todo)),
        );
      })
      .catch(error => {
        setUpdateErrorMessage('Unable to update a todo');
        throw error;
      });
  }

  function removeAllTodos() {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      deleteTodos(todo.id);
    });

    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleAllCompleted = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
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

  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={handleAllCompleted}
            />
          )}

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();

              if (!todoTitle.trim()) {
                setTitleErrorMessage('Title should not be empty');

                return;
              }

              addTodo({ title: todoTitle, completed: false });
              setTitleErrorMessage('');
            }}
          >
            <input
              ref={titleField}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoComponent
              key={todo.id}
              todo={todo}
              onClick={() => removeTodo(todo.id)}
              onCheckboxClick={() => updateTodo(todo.id)}
            />
          ))}
          {/* This is a completed todo */}

          {/* This todo is an active todo */}
          {false && (
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                Not Completed Todo
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}

          {/* This todo is being edited */}
          {false && (
            <div data-cy="Todo" className="todo">
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              {/* This form is shown instead of the title and remove button */}
              <form>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value="Todo is being edited now"
                />
              </form>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}

          {/* This todo is in loadind state */}
          {false && (
            <div data-cy="Todo" className="todo">
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

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* 'is-active' class puts this modal on top of the todo */}
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              style={{
                opacity: todos.some(todo => todo.completed) ? 1 : 0,
                pointerEvents: todos.some(todo => todo.completed)
                  ? 'auto'
                  : 'none',
              }}
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={removeAllTodos}
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
        className={`notification is-danger is-light has-text-weight-normal ${
          titleErrorMessage ||
          addErrorMessage ||
          deleteErrorMessage ||
          updateErrorMessage ||
          loadingErrorMessage
            ? ''
            : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setTitleErrorMessage('');
            setAddErrorMessage('');
            setDeleteErrorMessage('');
            setUpdateErrorMessage('');
            setLoadingErrorMessage('');
          }}
        />
        {titleErrorMessage ||
          addErrorMessage ||
          deleteErrorMessage ||
          updateErrorMessage ||
          loadingErrorMessage}
      </div>

      {false && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button data-cy="HideErrorButton" type="button" className="delete" />
          {/* show only one message at a time */}
          Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
