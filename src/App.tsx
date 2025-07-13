/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';

export const App: React.FC = () => {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>(todoData);

  const [todoTitle, setTodoTitle] = useState('');

  const [filterParam, setFilterParam] = useState('all');

  const [errorMessage, setErrorMessage] = useState('');

  const activeTodos = todoData.filter(todo => !todo.completed).length;

  const isCompletedTodos = todoData.some(todo => todo.completed);

  const isAllTodosCompleted =
    todoData.length > 0 && todoData.every(todo => todo.completed);

  const isOverlayActive = false; // для оверлея

  const createErrorMessage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodoData)
      .catch(() => createErrorMessage('Unable to load todos'));
  }, []);

  useEffect(() => {
    setTodoList(todoData);
  }, [todoData]);

  const handleFilter = (filter: string) => {
    setFilterParam(filter);

    setTodoList(
      todoData.filter(todo => {
        switch (filter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      }),
    );
  };

  const handleSubmit = (title: string) => {
    if (!title) {
      createErrorMessage('Title should not be empty');

      return;
    }

    if (false) {
      createErrorMessage('Unable to add a todo');
    }

    const newTodo = {
      id: 0,
      userId: 0,
      title: title,
      completed: false,
    };

    setTodoData(current => [...current, newTodo]);
    setTodoTitle('');
  };

  const handleDelete = (id: number) => {
    if (false) {
      createErrorMessage('Unable to delete a todo');
    }

    setTodoData(current => current.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodoData(current => current.filter(todo => !todo.completed));
  };

  // const handleUpdate = () => {
  //   if (false) {
  //     createErrorMessage('Unable to update a todo');
  //   }
  // };

  const handleSwitchStatus = (currentId: number) => {
    const index = todoData.findIndex(todo => todo.id === currentId);

    const { id, userId, title, completed } = todoData[index];
    const replacer = {
      id,
      userId,
      title,
      completed: completed ? false : true,
    };

    setTodoData(current => {
      const updated = [...current];

      updated.splice(index, 1, replacer);

      return updated;
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: isAllTodosCompleted,
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={() => handleSubmit(todoTitle)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value.trimStart())}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todoList.map((todo: Todo) => {
            const { id, title, completed } = todo;

            return (
              <div
                key={id}
                data-cy="Todo"
                className={cn('todo', { completed: completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                    onClick={() => handleSwitchStatus(id)}
                  />
                </label>

                {true ? (
                  <>
                    <span data-cy="TodoTitle" className="todo__title">
                      {title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => handleDelete(id)}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  // This form is shown instead of the title and remove button
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value="Todo is being edited now"
                    />
                  </form>
                )}

                {/* overlay will cover the todo while it is being deleted or updated */}
                {/* 'is-active' class puts this modal on top of the todo */}
                <div
                  data-cy="TodoLoader"
                  className={cn('modal', 'overlay', {
                    'is-active': isOverlayActive,
                  })}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {todoData.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterParam === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterParam === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterParam === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!isCompletedTodos}
              onClick={() => handleClearCompleted()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
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
};
