/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import classNames from 'classnames';
import { Status } from './types/status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titleTodo, setTitleTodo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);
  const [selectAllTodos, setSelectAllTodos] = useState(false);
  const [loaderId, setLoaderId] = useState<number | null>(null);
  const [isNotCompletedTodoVisible, setIsNotCompletedTodoVisible] =
    useState(false);
  const [isEditingTodoVisible, setIsEditingTodoVisible] = useState(false);
  const [isLoadingTodoVisible, setIsLoadingTodoVisible] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editingTitle, setEditingTitle] = useState('');

  // const handleDoubleClickEdit = (todoId: number, todoTitle: string) => {
  //   setIsEditing(true);
  //   setEditingTitle(todoTitle);
  // };

  const handleChangeStatus = (
    status: Status,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setFilterStatus(status);
  };

  useEffect(() => {
    todoService.getTodos().then(setTodos);
    setIsNotCompletedTodoVisible(false);
    setIsEditingTodoVisible(false);
    setIsLoadingTodoVisible(false);
  }, []);

  function addTodos({ title, userId, completed }: Todo) {
    todoService
      .createTodo({ title, userId, completed })
      .then(newTodos => {
        setTodos(currentTodos => [...currentTodos, newTodos]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleTodo.trim()) {
      setErrorMessage('Title should not be empty');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    } else {
      const newTodo = {
        title: titleTodo,
        userId: todoService.USER_ID,
        completed: false,
        id: Date.now(),
      };

      addTodos(newTodo);
      setTitleTodo('');
      setErrorMessage('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const areAllCompleted = todos.every(todo => todo.completed);

  const toggleTodoCompletion = (todoId: number) => {
    setLoaderId(todoId);
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
    setTimeout(() => {
      setLoaderId(null);
    }, 300);
  };

  function destroy(todoId: number) {
    todoService
      .deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
      });
  }

  const clearCompleted = () => {
    todos.filter(todo => todo.completed).forEach(todo => destroy(todo.id));
  };

  const itemsActive = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const selectAllTasks = () => {
    const allTodos = todos.map(todo => ({
      ...todo,
      completed: !selectAllTodos,
    }));

    setTodos(allTodos);
    setSelectAllTodos(!selectAllTodos);
  };

  const handleTodoUpdate = (updatedTodo: Todo) => {
    todoService
      .updateTodo(updatedTodo)
      .then(response => {
        setTodos(currentTodos => {
          const updatedIndex = currentTodos.findIndex(
            todo => todo.id === response.id,
          );
          const updatedTodos = [...currentTodos];

          updatedTodos[updatedIndex] = response;

          return updatedTodos;
        });
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
      })
      .finally(() => {
        setLoaderId(null);
      });
  };

  if (!todoService.USER_ID) {
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
            className={classNames('todoapp__toggle-all ', {
              active: selectAllTodos,
            })}
            data-cy="ToggleAllButton"
            onClick={selectAllTasks}
          />

          {/* Add a todo on form submit */}
          <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={titleTodo}
              onChange={e => {
                setTitleTodo(e.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
              onSubmit={() => handleTodoUpdate(todo)}
            >
              <label
                className="todo__status-label"
                onChange={() => toggleTodoCompletion(todo.id)}
              >
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  placeholder="Empty todo will be deleted"
                  checked={areAllCompleted}
                  // value={editingTitle}
                  // onChange={(e) => setEditingTitle(e.target.value)}
                />
              </label>

              <span
                data-cy="TodoTitle"
                className="todo__title"
                // onDoubleClick={() => handleDoubleClickEdit(todo.id, todo.title)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  destroy(todo.id);
                }}
              >
                ×
              </button>

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': loaderId === todo.id,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}

          {/* This todo is an active todo */}

          {isNotCompletedTodoVisible && (
            <div data-cy="Todo" className="todo hidden">
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
          {isEditingTodoVisible && (
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
          {isLoadingTodoVisible && (
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
              {itemsActive()} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterStatus === Status.All,
                })}
                data-cy="FilterLinkAll"
                onClick={e => handleChangeStatus(Status.All, e)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterStatus === Status.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={e => handleChangeStatus(Status.Active, e)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterStatus === Status.Completed,
                })}
                onClick={e => handleChangeStatus(Status.Completed, e)}
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
              onClick={clearCompleted}
              disabled={todos.every(todo => !todo.completed)}
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
        className={classNames(
          'notification',
          'is-light',
          'has-text-weight-normal',
          {
            'is-danger': errorMessage !== '',
            hidden: !errorMessage,
          },
        )}
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
  {
    /*
        Unable to update a todo */
  }
};
