/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/Todo';

import { getTodos, addTodo } from './api/todos';
import { BASE_URL } from './utils/fetchClient';

import { ErrorType } from './types/ErrorType';
import { ErrorShow } from './components/ErrorShow';

const USER_ID = 6980;

// type FilterType = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addingTodoTitle, setAddingTodoTitle] = useState('');
  const [errorToShow, setErrorToShow] = useState<ErrorType>('add');
  const [todosToShow, setTodosToShow] = useState(todos);
  const [chosenFilter, setChosenFilter] = useState<string>('all');

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosFromServer: Todo[]) => setTodos([...todosFromServer]));
  }, []);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      switch (chosenFilter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
        default:
          return todo;
      }
    });

    setTodosToShow(filteredTodos);
  }, [todos, chosenFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSetNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    return setAddingTodoTitle(value);
  };

  const getNewTodoId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const handleSubmitNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodoId = getNewTodoId();

    const newTodo = {
      id: newTodoId,
      userId: USER_ID,
      title: addingTodoTitle,
      completed: false,
    };

    addTodo(USER_ID, newTodo)
      .then((todo) => {
        // eslint-disable-next-line no-console
        console.log(todo);
        // setTodos((prevTodos) => ([
        //   ...prevTodos,
        //   todo,
        // ]));
        const error = new Error('adding error');

        return error;
      })
      .catch(() => setErrorToShow('add'));
  };

  const handleFilterTodo = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const target = event.target as HTMLAnchorElement;
    const { href } = target;
    const hashIndex = href.indexOf('#');
    const tail = href.slice(hashIndex + 2);

    // eslint-disable-next-line no-console
    console.log(tail);

    const filter = tail !== ''
      ? tail
      : 'all';

    setChosenFilter(filter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form
            action={BASE_URL}
            method="POST"
            onSubmit={handleSubmitNewTodo}
          >
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={addingTodoTitle}
              onChange={handleSetNewTitle}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {/* This is a completed todo */}
          <div className="todo completed">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
                checked
              />
            </label>

            <span className="todo__title">Completed Todo</span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is not completed */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span className="todo__title">Not Completed Todo</span>
            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
          {todosToShow.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className="filter__link selected"
              onClick={handleFilterTodo}
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              onClick={handleFilterTodo}
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              onClick={handleFilterTodo}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorShow errorToShow={errorToShow} setErrorToShow={setErrorToShow} />
    </div>
  );
};
