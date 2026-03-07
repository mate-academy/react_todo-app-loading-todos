import cn from 'classnames';

type Props = {
  allTodosCount: number;
  completedCount: number;
  loadTodos: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  allTodosCount,
  completedCount,
  loadTodos,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          allTodosCount === completedCount ? 'active' : '',
        )}
        data-cy="ToggleAllButton"
        disabled={loadTodos}
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
  );
};
