/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect, useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { TodosList } from './components/TodosList';
import { TodosSelection } from './components/TodosSelection';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodosSelections } from './types/TodosSelections';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterSelector, setFilterSelector]
    = useState<TodosSelections>(TodosSelections.All);
  const isTodosAvailable = todos.length > 0;

  const closeErrorField = () => (
    setHasError(false)
  );

  const getTodosFromServer = async () => {
    try {
      if (user) {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    setTimeout(() => setHasError(false), 3000);
  }, [hasError]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromServer();
  }, []);

  useEffect(() => {
    const filteredBySelection = todos.filter(todo => {
      switch (filterSelector) {
        case TodosSelections.Active:
          return !todo.completed;

        case TodosSelections.Completed:
          return todo.completed;

        default:
          return true;
      }
    });

    setFilteredTodos(filteredBySelection);
  }, [todos, filterSelector]);

  const remainActiveTodos = useMemo(() => (
    todos.filter(todo => todo.completed).length
  ), [todos]);

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
        {isTodosAvailable && (
          <>
            <TodosList todos={filteredTodos} />
            <TodosSelection
              setFilterSelector={setFilterSelector}
              remainActiveTodos={remainActiveTodos}
              filterSelector={filterSelector}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !hasError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={closeErrorField}
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
