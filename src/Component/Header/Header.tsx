import cn from 'classnames';

type Props = {
  activeTodosCount: number;
};

export const Header: React.FC<Props> = ({ activeTodosCount }) => {
  return (
    <header className="todoapp__header">
      <button
        aria-label="toggle todos"
        type="button"
        className={cn('todoapp__toggle-all', {
          active: !activeTodosCount,
        })}
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
