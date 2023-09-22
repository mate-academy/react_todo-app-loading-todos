/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Filter, Todo } from './types/Todo';
import { useTodos } from './useTodos';
import { client } from './utils/fetchClient';

const USER_ID = 11572;

export const App: React.FC = () => {
  const { todos } = useTodos(USER_ID);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('All');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [closeErrors, setCloseErrors] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editIsLoading, setEditIsLoading] = useState<boolean>(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const displayedTodos = () => {
    let filteredTodos = [...todos];

    filteredTodos = filteredTodos.filter(todo => {
      if (filter === 'Active' && todo.completed) {
        return false;
      }

      if (filter === 'Completed' && !todo.completed) {
        return false;
      }

      return true;
    });

    return filteredTodos;
  };

  const handleDoubleClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    console.log(`Todo "${todo.title}" was double-clicked`);
  };

  const handleCompletedStatus = (todo: Todo) => {
    const url = `/todos/${todo.id}`;
    const updatedData = { completed: !todo.completed };

    setEditIsLoading(true);

    client.patch(url, updatedData)
      .then((response) => {
        console.log(`Todo with ID ${todo.id} updated successfully:`, response);
      })
      .catch(error => {
        console.error(`Error updating todo with ID ${todo.id}:`, error);
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => setEditIsLoading(false));
  };

  const handleToggleAll = () => {
    if (todos.some(todo => !todo.completed)) {
      todos.forEach(
        (todo) => {
          const url = `/todos/${todo.id}`;

          client.patch(url, { completed: true })
            .then(() => {
              setEditIsLoading(true);
            })
            .catch(error => {
              console.error(`Error updating todo with ID ${todo.id}:`, error);
              setErrorMessage('Unable to update a todo');
            })
            .finally(() => setEditIsLoading(false));
        },
      );
    } else {
      todos.forEach(handleCompletedStatus);
    }
  };

  const handleEditTodo: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setEditTitle(event.target.value);
  };

  const handleFormSubmitEdited
  = (event: React.FormEvent<HTMLFormElement>, todo: Todo) => {
    event.preventDefault();
    const url = `/todos/${todo.id}`;
    const updatedData = { title: editTitle };

    setEditIsLoading(true);

    client.patch(url, updatedData)
      .then(response => {
        console.log(`Todo with ID ${todo.id} updated successfully:`, response);
      })
      .catch(error => {
        console.error(`Error updating todo with ID ${todo.id}:`, error);
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => setEditIsLoading(false));

    setEditTodo(null);
  };

  const handleDelete = (todo: Todo) => {
    const url = `/todos/${todo.id}`;

    client.delete(url).then(() => {
      console.log(`Todo with ID ${todo.id} deleted successfully`);
    })
      .catch(error => {
        console.error(`Error deleting todo with ID ${todo.id}:`, error);
        setErrorMessage('Unable to delete a todo');
      });
  };

  // const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const newTodoId: number = Date.now();

  //   const newTodo = {
  //     id: newTodoId,
  //     userId: USER_ID,
  //     title: newTodoTitle,
  //     completed: false,
  //   };

  //   client.post('/todos', newTodo).then((response) => {
  //     console.log('New todo created:', response);
  //   })
  //     .catch(error => {
  //       console.error(`Error deleting todo with ID ${newTodoId}:`, error);
  //       setErrorMessage('Unable to add a todo');
  //     });

  //   setNewTodoTitle('');
  // };

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      const url = `/todos/${todo.id}`;

      if (todo.completed) {
        return client.delete(url).then(() => {
          console.log(`Todo with ID ${todo.id} deleted successfully`);
        })
          .catch(error => {
            console.error(`Error deleting todo with ID ${todo.id}:`, error);
            setErrorMessage('Unable to delete a todo');
          });
      }

      return todo;
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            disabled={!todos}
            onClick={() => handleToggleAll()}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={(event) => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">

          {displayedTodos().map((todo) => {
            return (
              <div
                data-cy="Todo"
                className={cn('todo', {
                  completed: todo.completed,
                })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked
                    onChange={() => handleCompletedStatus(todo)}
                  />
                </label>

                {editTodo?.id === todo.id
                  ? (
                    <form
                      onSubmit={(event) => handleFormSubmitEdited(
                        event, editTodo,
                      )}
                    >
                      <input
                        data-cy="TodoTitleField"
                        type="text"
                        className="todo__title-field"
                        placeholder="Empty todo will be deleted"
                        value={editTitle}
                        onChange={
                          (event) => handleEditTodo(event)
                        }
                      />
                    </form>
                  )
                  : (
                    <>
                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => handleDoubleClick(todo)}
                      >
                        {todo.title}
                      </span>

                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        onClick={() => handleDelete(todo)}
                      >
                        ×
                      </button>

                      <div
                        data-cy="TodoLoader"
                        className={cn('modal', 'overlay', {
                          'is-active': editIsLoading,
                        })}
                      >
                        <div
                          className="modal-background has-background-white-ter"
                        />
                        <div className="loader" />
                      </div>
                    </>

                  )}

                {/* overlay will cover the todo while it is being updated */}

              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', { selected: filter === 'All' })}
              data-cy="FilterLinkAll"
              onClick={() => setFilter('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', { selected: filter === 'Active' })}
              data-cy="FilterLinkActive"
              onClick={() => setFilter('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filter === 'Completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter('Completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          {todos.some(todo => todo.completed) && (
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: closeErrors || !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setCloseErrors(true)}
        />
        {/* show only one message at a time */}
        {errorMessage && `${errorMessage}`}
        {/* {false && 'Unable to load todos'}
        {false && 'Title should not be empty'}
        {false && 'Unable to add a todo'}
        {false && 'Unable to delete a todo'}
        {false && 'Unable to update a todo'} */}
      </div>
    </div>
  );
};

//  {/* This is a completed todo */}
//  <div data-cy="Todo" className="todo completed">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//      checked
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Completed Todo
//  </span>

//  {/* Remove button appears only on hover */}
//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  {/* overlay will cover the todo while it is being updated */}
//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is not completed */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Not Completed Todo
//  </span>
//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  {/* This form is shown instead of the title and remove button */}
//  <form>
//    <input
//      data-cy="TodoTitleField"
//      type="text"
//      className="todo__title-field"
//      placeholder="Empty todo will be deleted"
//      value="Todo is being edited now"
//    />
//  </form>

//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is in loadind state */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Todo is being saved now
//  </span>

//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  {/* 'is-active' class puts this modal on top of the todo */}
//  <div data-cy="TodoLoader" className="modal overlay is-active">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>
