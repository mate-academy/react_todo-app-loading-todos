import cn from 'classnames';

type Props = {
  isEveryCompleted: boolean
};

export const Header: React.FC<Props> = ({ isEveryCompleted }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn(
          'todoapp__toggle-all',
          { active: isEveryCompleted },
        )}
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
};
