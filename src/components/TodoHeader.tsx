import classNames from 'classnames';

type Props = {
  isEveryActive: boolean;
  setError: (value: string) => void;
};

export const TodoHeader: React.FC<Props> = ({ isEveryActive }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          isEveryActive === true && 'active',
        )}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
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
