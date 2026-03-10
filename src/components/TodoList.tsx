import { useState } from 'react';
import TodoItem from './TodoItem';
import { getTodos } from '../api/todos';
import { useEffect } from 'react';
import CreateTodo from './CreateTodo';
import { createTodo } from '../api/todos';
import { USER_ID } from '../api/todos';
import ErrorMessages from './ErrorMessages';
import { ErrorMessagesNotification } from '../api/todos';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<ErrorMessagesNotification | null>(null);

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({
        title,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
    } catch {
      setError(ErrorMessagesNotification.ADD);
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
        setError(null);
      } catch (err) {
        setError(ErrorMessagesNotification.LOAD);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const filters = [
    { value: Filter.All, label: 'All', href: '#/', cy: 'FilterLinkAll' },
    {
      value: Filter.Active,
      label: 'Active',
      href: '#/active',
      cy: 'FilterLinkActive',
    },
    {
      value: Filter.Completed,
      label: 'Completed',
      href: '#/completed',
      cy: 'FilterLinkCompleted',
    },
  ];

  return (
    <>
      <CreateTodo
        onAdd={handleAddTodo}
        allCompleted={allCompleted}
        setError={setError}
      />
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </section>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            {filters.map(({ value, label, href, cy }) => (
              <a
                key={value}
                href={href}
                data-cy={cy}
                className={`filter__link ${filter === value ? 'selected' : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={todos.every(todo => !todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}

      <ErrorMessages error={error} setError={setError} />
    </>
  );
};

export default TodoList;
