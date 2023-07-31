import classNames from 'classnames';

type Props = {
  countTodoActive: number;
};

export const TodoHeader: React.FC<Props> = ({ countTodoActive }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: countTodoActive === 0 },
        )}
      >
        {}
      </button>
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
