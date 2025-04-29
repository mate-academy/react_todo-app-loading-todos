/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [todo, setTodo] = useState<Todo | undefined>();

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  // function loadTodos() {
  //   todosService
  //     .getTodos()
  //     .then(setTodos)
  //     .catch(() => {
  //       setError('Unable to load todos');
  //     });
  // }

  const reset = () => {
    setQuery('');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setQuery(event.target.value);
  };

  // function addTodo({ userId, title, completed }: Todo) {
  //   todosService.createTodos({ userId, title, completed }).then(newTodo => {
  //     setTodos(currentTodos => [...currentTodos, newTodo]);
  //   });
  // }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query) {
      setError('Title should not be empty');

      return;
    }

    setTodo({
      id: 0, //refactor?
      userId: 2816, //refactor?
      title: query,
      completed: false,
    });

    // if (!todo) {
    //   return;
    // }

    // addTodo(todo);

    reset();
  };

  const handleClick = (event: React.MouseEvent) => {
    setStatus(event.currentTarget.innerHTML);
  };

  //CHANGE IF
  if (error) {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  const normalizedStatus = status.toLowerCase();

  const filteredTodos = useMemo(() => {
    let fltrdTodos: Todo[] | undefined = todos;

    switch (normalizedStatus) {
      case 'all':
        fltrdTodos = todos;
        break;
      case 'active':
        fltrdTodos = todos?.filter(td => td.completed === false);
        break;
      case 'completed':
        fltrdTodos = todos?.filter(td => td.completed === true);
        break;
    }

    return fltrdTodos;
  }, [normalizedStatus, todos]);

  function deleteTodo(todoId: number) {
    todosService.deleteTodos(todoId);
    setTodos(currentTodo => currentTodo?.filter(td => td.id !== todoId));
  }

  // function updateTodo(updateTodo: Todo) {
  //   setTodos(currentTodo => {
  //     const newTodo = [...currentTodo];
  //     const index = newTodo.findIndex(td => td.id === updateTodo.id);

  //     newTodo.splice(index, 1, updateTodo);

  //     return newTodo;
  //   });
  // }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos && todos.length > 0 && (
            <button
              type="button"
              //add class active?
              className={`todoapp__toggle-all ${todos === filteredTodos ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleQueryChange}
              autoFocus
            />
          </form>
        </header>

        {todos && todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {/* This is a completed todo */}
            {filteredTodos?.map(td => (
              <div
                key={td.id}
                data-cy="Todo"
                className={`todo ${td.completed ? 'completed' : 'active'}`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    defaultChecked={td.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {td.title}
                </span>

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(td.id)}
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}

            {/* This todo is an active todo */}
            <div data-cy="Todo" className="todo">
              {/* <label className="todo__status-label">
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
            </div> */}
            </div>

            {/* This todo is being edited */}
            <div data-cy="Todo" className="todo">
              {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

              {/* This form is shown instead of the title and remove button */}
              {/* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form> */}

              {/* <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
            </div>

            {/* This todo is in loadind state */}
            <div data-cy="Todo" className="todo">
              {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

              {/* <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span> */}

              {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}

              {/* 'is-active' class puts this modal on top of the todo */}
              {/* <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div> */}
            </div>
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {/* CHANGE FOOTER !!!!!!!*/}
        {todos && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos?.filter(td => td.completed !== true).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${status === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={event => {
                  handleClick(event);
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${status === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={event => {
                  handleClick(event);
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={event => {
                  handleClick(event);
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
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setError('');
          }}
        />
        {/* show only one message at a time */}
        {error}
        {/* <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
