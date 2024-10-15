import cn from 'classnames';

type Props = {
  todosAmount: number;
  uncompletedTodosAmount: number;
};

export const Header: React.FC<Props> = ({
  todosAmount,
  uncompletedTodosAmount,
}) => {
  return (
    <header className="todoapp__header">
      {!!todosAmount && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: !!uncompletedTodosAmount,
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
        />
      </form>
    </header>
  );
};
