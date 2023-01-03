/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/Auth/TodoList';
import { Filter } from './components/Filter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [noError, setNoError] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    if (typeof user?.id === 'number') {
      getTodos(user.id)
        .then(todosFromServer => {
          setTodos(todosFromServer);
        })
        .catch(() => {
          setNoError(false);
        })
        .finally(() => {
          setTimeout(() => {
            setNoError(true);
          }, 3000);
        });
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const visibleTodos = todos.filter(({ completed }) => {
    switch (filterStatus) {
      case 'Active':
        return !completed;
      case 'Completed':
        return completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodo onFocus={setNoError} newTodoField={newTodoField} />

        <TodoList visibleTodos={visibleTodos} />

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${visibleTodos.length} items left`}
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
      </div>

      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
        hidden={noError}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setNoError(true)}
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
