/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [creatNewTodos, setCreateNewTodos] = useState('');
  const [dataFromServer, setDataFromServer] = useState<Todo[]>([]);
  const [allTodos, getAllTodos] = useState<Todo[]>([]);
  const [errorState, setStateError] = useState('');
  const userId = todosService.USER_ID;
  const [controlChecked, setControlChecked] = useState<number[]>([]);
  const [clickButtons, setClickButtons] = useState('');

  useEffect(() => {
    todosService
      .getTodos()
      .then(setDataFromServer)
      .catch(() => setStateError('Your error message'));
  }, []);

  useEffect(() => {
    let filterItems = [...dataFromServer];

    if (clickButtons === 'active') {
      filterItems = filterItems.filter(todo => !todo.completed);
    } else if (clickButtons === 'completed') {
      filterItems = filterItems.filter(todo => todo.completed);
    }

    setDataFromServer(filterItems);
  }, [clickButtons]);

  function errorGetTodos() {
    setStateError('');

    if (creatNewTodos.trim() === '') {
      setStateError('Title should not be empty');
      setTimeout(() => {
        setStateError('');
      }, 3000);

      return;
    }

    setTimeout(() => {}, 3000);

    todosService
      .getTodos()
      .then(data => {
        getAllTodos(data);
      })
      .catch(error => {
        setStateError('Unable to load todos');
        throw error;
      });

    setTimeout(() => {}, 3000);
  }

  const handleDeleteTodo = (userId: number) => {
    todosService
      .deleteTodos(userId)
      .then(() => {
        setDataFromServer(prevData =>
          prevData.filter(todo => todo.id !== userId),
        );
      })
      .catch(() => {
        setStateError('Unable to delete todo');
        setTimeout(() => setStateError(''), 3000);
      });
  };

  const updatedPost = (updatedPosts: Todo) => {
    todosService
      .updatePost(updatedPosts)
      .then(post => {
        setDataFromServer(currentPost => {
          const newPost = [...currentPost];
          const index = newPost.findIndex(item => item.id === updatedPosts.id);

          newPost.splice(index, 1, post);

          return newPost;
        });
      })
      .catch(() => {
        setStateError('Unable to update a todo');
        setTimeout(() => setStateError(''), 3000);
      });
  };

  function handleForm(event: React.FormEvent) {
    event.preventDefault();

    const newTodo: Omit<Todo, 'id'> = {
      userId,
      title: creatNewTodos,
      completed: false,
    };

    todosService.createPost(newTodo).then(createdTodo => {
      setDataFromServer(prevPost => [...prevPost, createdTodo]);
    });
  }

  if (!todosService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have active class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleForm}>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={creatNewTodos}
              onChange={event => {
                setCreateNewTodos(event.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}

          {dataFromServer.map(item => (
            <>
              <div
                data-cy="Todo"
                key={item.id}
                className={classNames('todo', {
                  completed: controlChecked.includes(item.id),
                })}
              >
                <label
                  className="todo__status-label"
                  onClick={() => {
                    setControlChecked([item.id]);
                  }}
                >
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {item.title}
                </span>
                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated is-active*/}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            </>
          ))}

          {/* This todo is an active todo */}
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
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is being edited */}
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

          {/* This todo is in loadind state */}
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

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: clickButtons === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => {
                setClickButtons('all');
              }}
            >
              All
            </a>
            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: clickButtons === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => {
                setClickButtons('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: clickButtons === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => {
                setClickButtons('completed');
              }}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames('', {
          'notification is-danger is-light has-text-weight-normal': errorState,
        })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className={classNames('', {
            // eslint-disable-next-line prettier/prettier
            'delete hidden': errorState,
          })}
          onClick={() => setStateError('')}
        />
        {/* show only one message at a time */}
        {errorState}
      </div>
    </div>
  );
};
