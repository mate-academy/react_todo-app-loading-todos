/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';

import { FilterStatus } from './types/Filter';
import { Todo } from './types/Todo';

const getTodoById = (todos: Todo[], todoId: number) => {
  return todos.find(({ id }) => id === todoId) || null;
};

const filterTodos = (todos: Todo[], filterStatus: FilterStatus) => {
  switch (filterStatus) {
    case 'all': return todos;
    case 'active': return todos.filter(({ completed }) => !completed);
    case 'completed': return todos.filter(({ completed }) => completed);
    default: throw new Error('Error: Filter todos');
  }
};

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [haveError, setHaveError] = useState(false);

  const handleStatusChange = (todoId: number) => {
    const copyTodos = [...visibleTodos];
    const changedTodo = getTodoById(copyTodos, todoId);

    if (changedTodo) {
      changedTodo.completed = !changedTodo.completed;
      setVisibleTodos(copyTodos);
    }
  };

  const handleCloseError = () => {
    setHaveError(false);
  };

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(todosFromServer => {
          setTodos(todosFromServer);
        })
        .catch(() => setHaveError(true));
    }

    setTimeout(() => setHaveError(false), 3000);
  }, []);

  useEffect(() => {
    setVisibleTodos(filterTodos(todos, filterStatus));
  }, [todos, filterStatus]);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={visibleTodos} onStatusChange={handleStatusChange} />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              4 items left
            </span>

            <Filter filterStatus={filterStatus} onFilter={setFilterStatus} />

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !haveError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseError}
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
