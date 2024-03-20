import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';
import { ErrorMessage } from '../../enums/ErrorMessage';
import { TodoFilter } from '../TodoFilter';
import { FilterStatus } from '../../enums/FilterStatus';
import { filterTodos } from '../../helpers/filterTodos';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [error, setError] = useState(ErrorMessage.Default);

  const notCompletedCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - notCompletedCount;

  const preparedTodos = filterTodos(todos, filter);

  const addTodoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addTodoInputRef.current) {
      addTodoInputRef.current.focus();
    }

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ErrorMessage.LoadTodos);
        setTimeout(() => {
          setError(ErrorMessage.Default);
        }, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={addTodoInputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={preparedTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${notCompletedCount} items left`}
              </span>

              <TodoFilter filter={filter} onFilterChange={setFilter} />

              <button
                type="button"
                disabled={completedCount < 1}
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: error === ErrorMessage.Default },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(ErrorMessage.Default)}
        />
        {error}
      </div>
    </div>
  );
};
