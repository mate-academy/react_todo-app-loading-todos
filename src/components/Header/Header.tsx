import cn from 'classnames';

type Props = {
  isAlltodosCompleted: boolean;
};

export const Header: React.FC<Props> = ({ isAlltodosCompleted }) => {
  return (
    <header className="todoapp__header">
      {/* DONE: this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isAlltodosCompleted,
        })}
        data-cy="ToggleAllButton"
      />

      {/* TODO: Add a todo on form submit */}
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
