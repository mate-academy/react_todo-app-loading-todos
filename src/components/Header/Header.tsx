import classNames from 'classnames';

type Props = {
  todosCompleted: number;
  todosActive: number;
};

export const Header: React.FC<Props> = ({ todosCompleted, todosActive }) => {
  return (
    <header className="todoapp__header">
      {(!!todosCompleted || !!todosActive) && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !todosActive && todosCompleted,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};
