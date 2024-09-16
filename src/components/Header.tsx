import classNames from 'classnames';

type Props = {
  todosLen: number;
  onSubmit: (event: React.FormEvent) => void;
  onReset: () => void;
  isAllCompleted: boolean;
  title: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Header: React.FC<Props> = ({
  todosLen,
  onSubmit,
  onReset,
  isAllCompleted,
  title,
  onTitleChange,
}) => {
  return (
    <header className="todoapp__header">
      {todosLen > 0 && (
        <button
          type="button"
          data-cy="ToggleAllButton"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
        />
      )}

      <form
        action="api/todos"
        method="POST"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={onTitleChange}
        />
      </form>
    </header>
  );
};
