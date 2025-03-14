/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';

import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { addTodo } from './api/todos';
import { deleteAll } from './api/todos';
// import { error } from 'console';

type Filter = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [originalTodoList, setOriginalTodoList] = useState<Todo[]>([]);

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(response => {
        setOriginalTodoList(response);
        setTodoList(response);
      })
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
    // console.log(todoList);
  }, []);

  // event: React.FormEvent
  // Обработка ошибок
  // function addPost({ title, userId, body }: Post) {
  //   setErrorMessage('');

  //   return postService.addPost({ title, userId, body })
  //     .then(newPost => {
  //       setPosts(currentPosts => [...currentPosts, newPost]);
  //     })
  //     .catch((error) => {
  //       setErrorMessage('Failed to add post');
  //       throw error;
  //     });
  // }
  const handleSubmit = (event: React.FormEvent, title: string) => {
    event.preventDefault();
    setErrorMessage('');

    if (!title.trim().length) {
      setErrorMessage(`Title should not be empty`);

      return;
    }

    if (title.trim().length > 0) {
      addTodo(title)
        .then(newTodo => {
          setTodoList(currentList => [...currentList, newTodo]);
          setOriginalTodoList(currentList => [...currentList, newTodo]);
          // console.log(todoList);
        })
        .catch(error => {
          setErrorMessage(`Unable to add a todo`);
          throw error;
        });
    }

    setTodoTitle('');
  };

  const handleDelete = (list: Todo[]) => {
    deleteAll(list);
    setTodoList([]);
    setOriginalTodoList([]);
  };

  const handleFilter = (filter: Filter) => {
    switch (filter) {
      case 'all':
        setTodoList(originalTodoList);
        break;
      case 'active':
        setTodoList(originalTodoList.filter(task => !task.completed));
        break;
      case 'completed':
        setTodoList(originalTodoList.filter(task => task.completed));
        break;
      default:
        setTodoList(originalTodoList);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todoList.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              // className={classNames('todoapp_toggle-all', {
              //   active: todoList.filter(task => task.completed),
              // })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={event => handleSubmit(event, todoTitle)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todoList.map(({ id, title, completed }) => (
            <div
              data-cy="Todo"
              className={classNames('todo', {
                completed: completed,
              })}
              key={id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>
              {/* 'is-active' class puts this modal on top of the todo */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {originalTodoList.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${originalTodoList.length} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
                onClick={() => handleFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
                onClick={() => handleFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => handleDelete(todoList)}
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
        // className="notification is-danger is-light has-text-weight-normal"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !errorMessage.length,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/* Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
      </div>
    </div>
  );
};

//
{
  /* This todo is being edited */
}
// {/* <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
//   </label>

//   {/* This form is shown instead of the title and remove button */}
//   <form>
//     <input
//       data-cy="TodoTitleField"
//       type="text"
//       className="todo__title-field"
//       placeholder="Empty todo will be deleted"
//       value="Todo is being edited now"
//     />
//   </form>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>; */}}}
