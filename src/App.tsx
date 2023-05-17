/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList';
import { TodoFilter } from './Components/TodoFilter';
import { FilterType } from './types/FilterType';
import { Error } from './Components/Error';

const USER_ID = 10390;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');

  const completedTodo = todos.filter(todo => todo.completed === true);
  const activeTodo = todos.length - completedTodo.length;

  const getFiltered = (filter: FilterType) => {
    switch (filter) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);

      case FilterType.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const onDeleteError = useCallback(
    async () => setErrorMessage(''), [errorMessage],
  );

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage('Unable to Load todos');
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodo = useMemo(() => getFiltered(filterBy), [todos, filterBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames(
              'todoapp__toggle-all', {
                active: filteredTodo.length === completedTodo.length,
              },
            )}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <TodoList todos={filteredTodo} />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodo} items left`}
            </span>
            <TodoFilter filter={filterBy} setFilter={setFilterBy} />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <Error message={errorMessage} onDelete={onDeleteError} />
    </div>
  );
};
