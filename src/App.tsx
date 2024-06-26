/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import * as todosFromServer from './api/todos';
import { wait } from './utils/fetchClient';

const getTodosByStatus = (status: string, todos: Todo[]) => {
  const preperedTodos = [...todos];

  if (status) {
    switch (status) {
      case 'active':
        return preperedTodos.filter(todo => todo.completed === false);
      case 'completed':
        return preperedTodos.filter(todo => todo.completed === true);
      default:
        return preperedTodos;
    }
  }

  return preperedTodos;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState('');
  const titleField = useRef<HTMLInputElement>(null);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getTodosByStatus(status, todos);

  const addTodo = (newTodoTitle: string) => {
    const editedTitle = newTodoTitle.trim();

    if (title) {
      todosFromServer
        .createTodos({
          userId: 839,
          title: editedTitle,
          completed: false,
        })
        .then(newTodo => setTodos(prevTodos => [...prevTodos, newTodo]));
    } else {
      setTitleError(true);
      wait(3000).then(() => setTitleError(false));
    }
  };

  useEffect(() => {
    todosFromServer
      .getTodos()
      .then(setTodos)
      .catch(() => setLoadError(true));
    wait(3000).then(() => setLoadError(false));
  }, []);

  useEffect(() => {
    titleField.current?.focus();
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  function updateTodo(updatedTodo: Todo) {
    todosFromServer.updateTodos(updatedTodo).then(todo =>
      setTodos(currentTodos => {
        const newTodos = [...currentTodos];
        const index = newTodos.findIndex(
          thisTodo => thisTodo.id === updatedTodo.id,
        );

        newTodos.splice(index, 1, todo);

        return newTodos;
      }),
    );
  }

  const handleDeleteTodo = (todo: Todo) => {
    todosFromServer.deleteTodos(todo.id);
  };

  const handleIsCompleted = (todo: Todo) => {
    const newTodo = { ...todo, completed: !todo.completed };

    updateTodo(newTodo);
  };

  const handleActiveTodos = () => {
    setStatus('active');
  };

  const handleCompletedTodos = () => {
    setStatus('completed');
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    addTodo(title);
    setTitle('');
  };

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
            // className={classNames("todoapp__toggle-all", { "active": todo.completed})}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleFormSubmit}>
            <input
              value={title}
              ref={titleField}
              autoFocus={true}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleTitleChange}
            />
          </form>
        </header>

        {/* This is a completed todo */}
        {filteredTodos.map(todo => (
          <section className="todoapp__main" data-cy="TodoList" key={todo.id}>
            <div
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => {
                    handleIsCompleted(todo);
                  }}
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
                onClick={() => handleDeleteTodo(todo)}
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </section>
        ))}

        {todos.length !== 0 && (
          // {/* Hide the footer if there are no todos */}
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: status === '',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setStatus('')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: status === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={handleActiveTodos}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: status === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={handleCompletedTodos}
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

      {/* {error && ( */}
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !loadError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {loadError && 'Unable to load todos'}
        <br />
        {titleError && 'Title should not be empty'}
        <br />
        {/* Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
      </div>
    </div>
  );
};

//           {/* This todo is an active todo */}
//           {/* <div data-cy="Todo" className="todo">
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
//           </div> */}

//           {/* This todo is being edited */}
//           {/* <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label> */}

//             {/* This form is shown instead of the title and remove button */}
//             {/* <form>
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
//           </div> */}

//           {/* This todo is in loadind state */}
//           {/* <div data-cy="Todo" className="todo">
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
//             {/* <div data-cy="TodoLoader" className="modal overlay is-active">
//               <div className="modal-background has-background-white-ter" />
//               <div className="loader" />
//             </div>

//           </div>
// */}
