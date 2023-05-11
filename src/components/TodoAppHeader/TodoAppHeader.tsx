/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  activeTodosCount: number;
};

export const TodoAppHeader: React.FC<Props> = ({ activeTodosCount }) => (
  <header className="todoapp__header">
    {activeTodosCount > 0 && (
      <button
        type="button"
        className="todoapp__toggle-all active"
      />
    )}

    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
