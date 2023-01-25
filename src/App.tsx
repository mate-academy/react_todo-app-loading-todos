/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { filterTodos } from './helpers/filterTodos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isErrorHidden, setIsErrorHidden] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const hideErrorMessage = () => {
    setTimeout(() => {
      setIsErrorHidden(true);
    }, 3000);
  };

  useEffect(() => {
    if (user) {
      getTodos(user.id / 5.5)
        .then(setTodos)
        .catch(() => {
          setIsErrorHidden(false);
        })
        .finally(hideErrorMessage);
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const visibleTodos = useMemo(
    () => (filterTodos(todos, statusFilter)),
    [todos, statusFilter],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo onFocus={setIsErrorHidden} newTodoField={newTodoField} />

        <TodoList todos={visibleTodos} />

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${visibleTodos.length} items left`}
          </span>

          <Filter
            filterStatus={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </div>

      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
        hidden={isErrorHidden}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsErrorHidden(true)}
        />

        Unable to load a todo
      </div>
    </div>
  );
};
