/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { addTodo, getTodos } from './api/todos';
// import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { AuthContext } from './components/Auth/AuthContext';
import { Errors } from './components/Errors/Errors';
import { Filter } from './components/Filter/Filter';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const newTodoField = useRef<HTMLInputElement>(null);

  const complitedTodos = useMemo(() => (
    todos.filter(todo => todo.completed)
  ), [todos]);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const loadTodos = useCallback(() => {
    if (!user) {
      return;
    }

    getTodos(user.id).then(setTodos);
  }, [user]);

  useEffect(() => {
    loadTodos();
  }, [user]);

  const maxId = todos.reduce(
    (prevTodoId, todo) => Math.max(prevTodoId, todo.id), 0,
  );

  const filteredTodos = useMemo(() => todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return !todo.completed;

      case 'Comleted':
        return todo.completed;

      case 'All':
      default:
        return todo;
    }
  }), [todos, filter]);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    if (user && title.trim()) {
      addTodo({
        userId: user.id,
        title,
        id: maxId + 1,
        completed: false,
      });

      loadTodos();
    } else {
      setError('add');
    }

    setTitle('');
  }, [user, title]);

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

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos.length} items left`}
            </span>

            <Filter
              filter={filter}
              onSetFilter={() => setFilter}
            />

            {complitedTodos && (
              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <Errors
        error={error}
        onSetError={setError}
      />
    </div>
  );
};
