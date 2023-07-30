/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  numberOfActiveTodos: number,
};

export const TodoHeader: React.FC<Props> = ({ numberOfActiveTodos }) => (
  <header className="todoapp__header">
    <form>
      {numberOfActiveTodos !== 0 && (
        <button type="button" className="todoapp__toggle-all active" />
      )}

      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
