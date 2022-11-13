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
import { Types } from './types/Types';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { NewTodo } from './components/NewTodo';

const FILTERS: Types = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FILTERS.all);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  async function loadTodos() {
    if (user) {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
    }
  }

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const activeTodosLength = todos.filter(todo => !todo.completed).length;

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

          <NewTodo newTodoField={newTodoField} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <TodoFilter
              setFilter={setFilter}
              filters={FILTERS}
              activeTodosLength={activeTodosLength}
            />
          </>
        )}
      </div>
    </div>
  );
};
