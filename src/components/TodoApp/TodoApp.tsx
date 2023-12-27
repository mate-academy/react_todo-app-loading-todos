/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../libs/state';
import { Todo } from '../../libs/types';
import { Actions } from '../../libs/enums';
import { TodoCreate } from '../TodoCreate';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { getFilteredTodos, getHash } from '../../libs/helpers';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

export const TodoApp: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const [filteredTodos, setFilterdTodos] = useState<Todo[]>([]);

  const updateFilteredTodos = useCallback((updatedTodos: Todo[]) => {
    const filterHash = getHash();
    const filtered = getFilteredTodos(updatedTodos, filterHash);

    setFilterdTodos(filtered);
  }, []);

  useEffect(() => {
    updateFilteredTodos(todos);
  }, [todos, updateFilteredTodos]);

  useEffect(() => {
    const handleHashChange = () => {
      updateFilteredTodos(todos);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [todos, updateFilteredTodos]);

  const competedCount = useMemo(() => (
    todos.filter(({ completed }) => completed).length
  ), [todos]);

  const activeCount = todos.length - competedCount;

  const handleAddTodo = useCallback((newTodo: Todo) => {
    dispatch({
      type: Actions.add,
      payload: { todo: newTodo },
    });
  }, [dispatch]);

  const handleToggleAll = useCallback(() => {
    dispatch({
      type: Actions.toggleAll,
      payload: { isCompleted: !!activeCount },
    });
  },
  [activeCount, dispatch]);

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: Actions.clearComleted });
  }, [dispatch]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {!!todos.length && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: !activeCount,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          {/* Add a todo on form submit */}
          <TodoCreate onAdd={handleAddTodo} />
        </header>

        <TodoList items={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeCount} items left`}
            </span>

            <TodosFilter />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={!!competedCount}
            >
              Clear completed
            </button>

          </footer>
        )}
      </div>
      <ErrorNotification />
    </div>
  );
};
