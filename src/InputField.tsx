/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  hasTodos: boolean,
}

export const InputField: React.FC<Props> = ({ hasTodos }) => {
  return (
    <header className="todoapp__header">
      {hasTodos && <button type="button" className="todoapp__toggle-all" />}

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
