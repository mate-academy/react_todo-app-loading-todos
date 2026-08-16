/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  deleteCompleted,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

type SelectedType = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [selectedFilterLink, setSelectedFilterLink] =
    useState<SelectedType>('all');
  const [error, setError] = useState<string>('');

  const timerError = useRef<NodeJS.Timeout | null>(null);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    switch (selectedFilterLink) {
      case 'all':
        return true;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return false;
    }
  });

  const todosCounter = todos.reduce((curr, todo) => {
    return !todo.completed ? curr + 1 : curr;
  }, 0);

  const completedAllTodos = () => {
    setTodos(
      todos.map(todo => {
        const copyTodo = { ...todo };

        if (allCompleted) {
          copyTodo.completed = false;
        } else {
          copyTodo.completed = true;
        }

        return copyTodo;
      }),
    );
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);

  function checkedTodoComleted(id: number, completed: boolean) {
    setError('');

    updateTodo(id, completed)
      .then(data => {
        setTodos(
          todos.map(todo => {
            if (data.id === id) {
              return data;
            }

            return todo;
          }),
        );
      })
      .catch(() => setError('Unable to update a todo'));
  }

  function removeTodo(id: number) {
    setError('');

    deleteTodo(id)
      .then(() => {
        const newTodosWithOutDelete = todos.filter(todo => todo.id !== id);

        setTodos(newTodosWithOutDelete);
      })
      .catch(() => setError('Unable to delete a todo'));
  }

  function clearCompleted() {
    setError('');

    deleteCompleted(true)
      .then(() => {
        const newTodoWithOutCompleted = todos.filter(todo => !todo.completed);

        setTodos(newTodoWithOutCompleted);
      })
      .catch(() => setError('Unable to delete a todo'));
  }

  useEffect(() => {
    setError('');

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (error === '') {
      return;
    }

    if (timerError.current !== null) {
      clearTimeout(timerError.current);
    }

    timerError.current = setTimeout(() => {
      setError('');
    }, 3000);

    return () => {
      if (timerError.current === null) {
        return;
      }

      clearTimeout(timerError.current);
    };
  }, [error]);

  if (!USER_ID) {
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
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={completedAllTodos}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() =>
                        checkedTodoComleted(todo.id, !todo.completed)
                      }
                    />
                  </label>

                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>

                  {/* Remove button appears only on hover */}
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => removeTodo(todo.id)}
                  >
                    ×
                  </button>

                  <div data-cy="TodoLoader" className="modal overlay">
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${todosCounter} items left`}
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link ${
                    selectedFilterLink === 'all' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkAll"
                  onClick={() => {
                    setSelectedFilterLink('all');
                  }}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${
                    selectedFilterLink === 'active' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkActive"
                  onClick={() => setSelectedFilterLink('active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${selectedFilterLink === 'completed' ? 'selected' : ''}`}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setSelectedFilterLink('completed')}
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
                disabled={!hasCompletedTodos}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error === '' ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        <p>{error}</p>
      </div>
    </div>
  );
};

// {/* DON'T use conditional rendering to hide the notification */}
//       {/* Add the 'hidden' class to hide the message smoothly */}
//       <div
//         data-cy="ErrorNotification"
//         className={`notification is-danger is-light has-text-weight-normal ${error === '' ? 'hidden' : ''}`}
//       >
//         <button
//           data-cy="HideErrorButton"
//           type="button"
//           className="delete"
//           onClick={() => setError('')}
//         />
//         <p>{error}</p>
//       </div>

// Unable to load todos
//         <br />
//         Title should not be empty
//         <br />
//         Unable to add a todo
//         <br />
//         Unable to delete a todo
//         <br />
//         Unable to update a todo

//  {/* This todo is an active todo */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Not Completed Todo
//             </span>
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is being edited */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             {/* This form is shown instead of the title and remove button */}
//             <form>
//               <input
//                 data-cy="TodoTitleField"
//                 type="text"
//                 className="todo__title-field"
//                 placeholder="Empty todo will be deleted"
//                 value="Todo is being edited now"
//               />
//             </form>

//             <div data-cy="TodoLoader" className="modal overlay">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>

//           {/* This todo is in loadind state */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Todo is being saved now
//             </span>

//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>

//             {/* 'is-active' class puts this modal on top of the todo */}
//             <div data-cy="TodoLoader" className="modal overlay is-active">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>
//           </div>
