import classNames from 'classnames';

type Props = {
  isAllCompleted: boolean;
  isPresentTodos: boolean;
};

export const Header = ({ isAllCompleted, isPresentTodos }: Props) => (
  <header className="todoapp__header">
    {/* this button should have `active` class only if all todos are completed */}
    {isPresentTodos && (
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isAllCompleted,
        })}
        data-cy="ToggleAllButton"
      />
    )}

    {/* Add a TodoElement on form submit */}
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
