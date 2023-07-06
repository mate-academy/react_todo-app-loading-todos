import cn from 'classnames';

type Props = {
  hasCompletedTodos: boolean,
};

export const Header:React.FC<Props> = ({ hasCompletedTodos }) => (
  <header className="todoapp__header">
    {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
    <button
      type="button"
      className={cn('todoapp__toggle-all', {
        active: hasCompletedTodos,
      })}
    />

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
