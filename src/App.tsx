/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { getTodos, addTodo } from './api/todos';
import { Todo } from './types/Todo';
import { TodosList } from './components/TodosList';
import { FilterBy } from './types/FilterBy';
import { Footer } from './components/Footer';
import { TodoAdd } from './components/TodoAdd';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  // Add new Todo
  const [todosList, setTodoList] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // Errors
  const [titleError, setTitleError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  // Filter By
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const leftTodos = todosList.filter(todo => todo.completed === false).length;

  const filteredTodos = todosList.filter(todo => {
    switch (filterBy) {
      case FilterBy.Active:
        return todo.completed === false;
      case FilterBy.Completed:
        return todo.completed === true;
      case FilterBy.All:
      default:
        return true;
    }
  });

  const getTodosList = async () => {
    if (user) {
      setTodoList(await getTodos(user.id));
    }
  };

  const handlerFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normilizedTodoTitle = newTodoTitle
      .trim()
      .split(' ')
      .filter(words => words !== '')
      .join(' ');

    if (!normilizedTodoTitle) {
      setTitleError(true);
      setNewTodoTitle('');

      return;
    }

    if (user && !titleError) {
      await addTodo(user.id, normilizedTodoTitle);
      getTodosList();
    }

    setNewTodoTitle('');
  };

  const handlerInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
    setTitleError(false);
  };

  const ClearError = () => {
    setDeleteError(false);
    setUpdateError(false);
    setTitleError(false);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosList();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <TodoAdd
            newTodoField={newTodoField}
            newTodoTitle={newTodoTitle}
            handlerFormSubmit={handlerFormSubmit}
            handlerInputTitle={handlerInputTitle}
          />
        </header>

        {todosList.length > 0
          && <TodosList todos={filteredTodos} />}

        {/* <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">CSS</span>

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

          <span data-cy="TodoTitle" className="todo__title">React</span>
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

          <span data-cy="TodoTitle" className="todo__title">Redux</span>
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
        </div> */}

        {todosList.length > 0
          && (
            <Footer
              leftTodos={leftTodos}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          )}
      </div>

      {(titleError || deleteError || updateError) && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={ClearError}
          />

          {titleError && ('Unable to add a todo')}

          {deleteError && <br /> && 'Unable to delete a todo'}

          {updateError && <br /> && 'Unable to update a todo'}
        </div>
      )}
    </div>
  );
};
