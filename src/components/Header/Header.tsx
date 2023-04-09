import classNames from 'classnames';

type Props = {
  hasActiveTodos: boolean;
};

export const Header: React.FC<Props> = ({ hasActiveTodos }) => (
  <header className="todoapp__header">
    <button
      aria-label="all-active"
      type="button"
      className={classNames(
        'todoapp__toggle-all',
        { active: !hasActiveTodos },
      )}
      disabled={!hasActiveTodos}
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
