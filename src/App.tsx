/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import {
  getTodos,
  addTodo,
} from './api/todos';
import { FilterType } from './types/FilterType';
import { ErrorNotification } from './types/ErrorNotification';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodos } from './components/FilterTodos/FilterTodos';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterType.All);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(ErrorNotification.None);

  const loadingTodos = async () => {
    if (!user) {
      return;
    }

    const todosFromServer = await getTodos(user.id);

    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadingTodos();
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title.trim() && user) {
        await addTodo({
          userId: user.id,
          title: title.trim(),
          completed: false,
        });

        await loadingTodos();

        setTitle('');
      } else {
        setError(ErrorNotification.Add);
      }
    }, [title, user],
  );

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filter) {
        case FilterType.Completed:
          return todo.completed;

        case FilterType.Active:
          return !todo.completed;

        case FilterType.All:
        default:
          return todo;
      }
    })
  ), [todos, filter]);

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: !activeTodos.length,
              })}
            />
          )}

          <NewTodo
            onSubmit={handleSubmit}
            title={title}
            onTitleChange={setTitle}
          />
        </header>

        <TodoList todos={visibleTodos} />

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos.length} items left`}
          </span>

          <FilterTodos
            filter={filter}
            onFilterChange={setFilter}
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

      <Error
        error={error}
        onErrorChange={setError}
      />
    </div>
  );
};
