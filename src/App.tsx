/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { AddTodo } from './components/Auth/AddTodo';
import { Todo } from './types/Todo';
import {
  addTodos, getTodos, editTodo,
} from './api/todos';
import { TodoList } from './components/Auth/TodoList';
import { Footer } from './components/Auth/Footer';
import { FilterTodos } from './utils/FilterTodos';
// import { User } from './types/User';

export const App: React.FC = () => {
  // export enum FilterTodos {
  //   ALL = 'All',
  //   ACTIVE = 'Active',
  //   COMLETED = 'Completed',
  // }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterTodos.ALL);
  const [queryOfTitle, setQueryOfTitle] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);
  // const [deleteCompletedTodo, setDeleteCompletdTodo] = useState(false);
  // const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  // const [addError, setAddError] = useState(false);
  // const [deleteError, setDeleteError] = useState(false);
  // const [updateError, setUpdateError] = useState(false);

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      }
    } catch (err) {
      // setHasError(true);
      // setTimeout(() => {
      //   setHasError(false);
      // }, 3000);
    }
  };

  // const handleDeleteTodo = async (id: number) => {
  //   try {
  //     await deleteTodo(id);
  //     getTodosFromServer();
  //   } catch (err) {
  //     setHasError(true);
  //     setDeleteError(true);
  //   }
  // };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterTodos.ACTIVE:
        return !todo.completed;
      case FilterTodos.COMLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const deleteCompleted = () => {
    const completedTodos = todos.filter(todo => !todo.completed);

    setTodos(completedTodos);
  };

  // const handleEditTodo = async (id: number, comleted: boolean) => {
  //   setIsCompleted(comleted);
  //   editTodo(id, comleted);
  //   getTodosFromServer();
  // };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAdding(true);

    const trimtitle = queryOfTitle.trim();

    if (!trimtitle) {
      setErrorMessage('Title can\'t be empty');
      setHasError(true);
      setQueryOfTitle('');

      return;
    }

    if (user && !hasError) {
      // if (isAdding) {
      //   const tempoTodo = {
      //     id: 0,
      //     userId: user.id,
      //     title: queryOfTitle,
      //     completed: false,
      //   };

      await addTodos(user.id, trimtitle);
      getTodosFromServer();
    }

    setIsAdding(false);
    setQueryOfTitle('');
  };

  const handleQueryOfTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQueryOfTitle(event.target.value);
  };

  const activeTodos = todos.filter(todo => todo.completed === false).length;

  const editAllTodos = () => {
    return todos.map(async (todo) => {
      if (todo.completed === true) {
        // const newTodo =
        await editTodo(todo.id, false);

        getTodosFromServer();

        // return newTodo;
      } else {
        await editTodo(todo.id, true);

        getTodosFromServer();
      }

      // return todo;
    });

    // setTodos(newListOFTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            onClick={editAllTodos}
          />
          <AddTodo
            newTodoField={newTodoField}
            handleQueryOfTitle={handleQueryOfTitle}
            queryOfTitle={queryOfTitle}
            handleOnSubmit={handleOnSubmit}
            isAdding={isAdding}
          />
        </header>
        {/* <section className="todoapp__main" data-cy="TodoList">
          <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                defaultChecked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              HTML
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              CSS
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                defaultValue="JS"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              React
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Redux
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section> */}
        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos}
            getTodosFromServer={getTodosFromServer}
            // isAdding={isAdding}
            // handleDeleteTodo={handleDeleteTodo}
            // isCompleted={isCompleted}
          />
        )}
        <Footer
          activeTodos={activeTodos}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          deleteCompleted={deleteCompleted}
        />
        {/* <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            4 items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              data-cy="FilterLinkAll"
              href="#/"
              className="filter__link selected"
            >
              All
            </a>

            <a
              data-cy="FilterLinkActive"
              href="#/active"
              className="filter__link"
            >
              Active
            </a>
            <a
              data-cy="FilterLinkCompleted"
              href="#/completed"
              className="filter__link"
            >
              Completed
            </a>
          </nav>

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        </footer> */}
      </div>
      {hasError && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          {errorMessage}
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setHasError(false)}
          />
          Unable to add a todo
          <br />
          {/* {deleteError && 'Unable to delete a todo'} */}
          <br />
          Unable to update a todo
        </div>
      )}
      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
    </div>
  );
};
