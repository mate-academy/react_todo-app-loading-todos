import cn from 'classnames';
type Props = {
  isAllCompleted: boolean;
  todosAmount: number;
};

export const TodoHeader: React.FC<Props> = ({
  isAllCompleted,
  todosAmount,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todosAmount && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllCompleted })}
          data-cy="ToggleAllButton"
        />
      )}

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
