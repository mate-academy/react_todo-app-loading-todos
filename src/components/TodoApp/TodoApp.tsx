/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import cn from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoApp: React.FC = () => {
  const { todos, error, setError } = useContext(TodoContext);

  const anyCompletedTodos = todos.some(todo => todo.completed);
  const anyActiveTodos = todos.some(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {anyActiveTodos && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer">
              <span className="todo-count">
                3 items left
              </span>

              <TodosFilter />

              {/* don't show this button if there are no completed todos */}
              {anyCompletedTodos && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */ }
      <div className={cn(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: error.length === 0 },
      )}
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
