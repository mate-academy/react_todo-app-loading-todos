import { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoStatusFilter } from './types/TodoStatusFilter';
import { Notification } from './components/Notifications/Notifications';

const getfilteredTodos = (
  todos: Todo[],
  { status }: { status: TodoStatusFilter },
) => {
  let filteredTodos = [...todos];

  if (status !== TodoStatusFilter.all) {
    filteredTodos = filteredTodos.filter(todo => {
      if (status === TodoStatusFilter.completed) {
        return todo.completed;
      }

      return !todo.completed;
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>(
    TodoStatusFilter.all,
  );

  useEffect(() => {
    async function loadTodos() {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
      }
    }

    loadTodos();
  }, []);

  const onCompletedChange = (todoId: number) =>
    setTodos(currentTodos => {
      if (!currentTodos) {
        return [];
      }

      return currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      );
    });

  const visibleTodos = getfilteredTodos(todos, { status: statusFilter });

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <TodoList todos={visibleTodos} onCompletedChange={onCompletedChange} />
        {todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>
            <TodoFilter
              status={statusFilter}
              onStatusChange={setStatusFilter}
            />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodos.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <Notification error={errorMessage} onErrorClean={setErrorMessage} />
    </div>
  );
};
