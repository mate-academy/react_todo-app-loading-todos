/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useEffect,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Input } from './components/Input/Input';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';

const USER_ID = 11433;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] >([]);
  const [error, setError] = useState<boolean>(false);
  const [filterTodos, setFilterTodos]
    = useState<FilterType>('all');

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        setError(true);
      });
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSetFilterTodos = (filterType: FilterType) => {
    setFilterTodos(filterType);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Input />
        {todos && <TodoList todos={todos} filterTodos={filterTodos} />}

        <section className="todoapp__main">

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
        </section>
        {/* Hide the footer if there are no todos */}
        {todos.length
        && (
          <Footer
            handleSetFilterTodos={handleSetFilterTodos}
            todos={todos}
            filterTodos={filterTodos}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button type="button" className="delete" />

          {/* show only one message at a time */}
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
