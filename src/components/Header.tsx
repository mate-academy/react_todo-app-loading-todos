import classNames from 'classnames';

type Props = {
  isToggleAllActive: boolean;
};

export const Header: React.FC<Props> = ({ isToggleAllActive }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: isToggleAllActive,
      })}
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
);
