/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { TodoList } from './components/TodoList';
import { Navigation } from './components/Navigation';

const filters = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(filters.all);
  const [error, setError] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id).then(setTodos);
    }
  }, []);

  const removeError = () => {
    setError('');
  };

  const visibleTodos = todos.filter(todo => {
    const { all, active, completed } = filters;

    switch (selectedFilter) {
      case all:
        return todo;

      case active:
        return !todo.completed;

      case completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const filterTodos = (filterBy: string) => {
    setSelectedFilter(filterBy);
  };

  const uncompletedTodos = todos.filter(todo => !todo.completed);

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

        {todos.length !== 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${uncompletedTodos.length} items left`}
              </span>

              <Navigation
                isSelected={selectedFilter}
                onTodoFilter={filterTodos}
              />

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>

            </footer>
          </>
        )}
      </div>

      {error && (
        <Error
          error={error}
          onRemoveError={removeError}
        />
      )}
    </div>
  );
};
