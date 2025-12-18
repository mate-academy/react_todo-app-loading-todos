/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useTodos } from './hooks/use';
import { useTodosFilter } from './hooks/filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';

export const App: React.FC = () => {
  const {
    todos,
    isTodosLoading,
    loadTodosErrorMessage,
    setLoadTodosErrorMessage,
  } = useTodos();
  const { statusFilter, setStatusFilter, filteredTodos } =
    useTodosFilter(todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeItemsCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!isTodosLoading && Boolean(todos.length) && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer
              activeTodosCount={activeItemsCount}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              hasCompletedTodos={false}
              onClearCompleted={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </>
        )}
      </div>

      <ErrorMessage
        errorMessage={loadTodosErrorMessage}
        setErrorMessage={setLoadTodosErrorMessage}
      />
    </div>
  );
};
